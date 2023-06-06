import { BIP32Factory } from 'bip32';
import * as bip39 from 'bip39';
import * as Bitcoin from 'bitcoinjs-lib';
import { varuint } from 'bitcoinjs-lib/src/bufferutils';
import bitcore from 'bitcore-lib';
import ECPairFactory, { ECPairInterface, Signer } from 'ecpair';
import * as ecc from 'tiny-secp256k1';

import { NetworkKey } from '@/lib/entities/Wallet.entity';

/**
 * @dev Initializes dependencies
 */
const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);
Bitcoin.initEccLib(ecc);

/**
 * @notice `WalletProvider` provide an infrastructure layer to interact with `bitcoinjs-lib` and other crypto-based libraries.
 */
export class WalletProvider {
  /**
   * @dev Export wallet storage key
   */
  public static WALLET_STORAGE_KEY = 'wallet';

  /**
   * @dev Expose publicly
   */
  public network: Bitcoin.Network;
  public accountName = '';

  /**
   * @dev Some private properties
   * @private
   */
  private p2tr: Bitcoin.payments.Payment | null = null;
  private signer: Signer | null = null;
  private keypair: ECPairInterface | null = null;
  private taprootSigner: Signer | null = null;

  /**
   * @notice Constructor should need a network key
   * @param networkKey
   * @param storage
   */
  constructor(
    private readonly networkKey: NetworkKey,
    private readonly storage: Storage
  ) {
    this.network = Bitcoin.networks[this.networkKey];
  }

  /**
   * @notice Get message signer
   */
  public getMessageSigner() {
    const privateKeyStr = (this.keypair?.privateKey || '').toString('hex');
    const privateKey = new bitcore.PrivateKey(privateKeyStr);

    return {
      /**
       * @dev Sign message
       * @param text
       */
      sign: (text: string) => {
        const message = new bitcore.Message(text);
        return message.sign(privateKey);
      },

      /**
       * @notice Recover signature
       * @param text
       * @param messageHash
       */
      verify: (text: string, messageHash: string) => {
        const message = new bitcore.Message(text);
        return message.verify(privateKey.toAddress(), messageHash);
      },
    };
  }

  public getTaprootSigner(): Signer {
    if (!this.taprootSigner) {
      throw new Error('SIGNER_NOT_INITIALIZED');
    }

    return this.taprootSigner;
  }

  /**
   * @notice Get current signer
   */
  public getSigner(): Signer {
    if (this.signer === null) {
      throw new Error('SIGNER_NOT_INITIALIZED');
    }

    return this.signer;
  }

  /**
   * @notice Get current signer
   */
  public getPayment(): Bitcoin.Payment {
    if (this.p2tr === null) {
      throw new Error('PAYMENT_NOT_INITIALIZED');
    }

    return this.p2tr;
  }

  /**
   * @notice Initialize new wallet entity
   */
  public async restoreOrCreateWallet(): Promise<void> {
    try {
      const { mnemonic, path, accountName } = JSON.parse(
        this.storage.getItem(WalletProvider.WALLET_STORAGE_KEY) as string
      );
      await this.loadWallet(mnemonic, path, accountName);
    } catch {
      const mnemonic = bip39.generateMnemonic(128);
      const path = `m/86'/0'/0'/0/0`;
      const accountName = `Main Account`;
      await this.loadWallet(mnemonic, path, accountName);
    }
  }

  /**
   * @notice Load wallet with mnemonic phrase and HD path.
   * @param mnemonic
   * @param path
   * @param accountName
   */
  public async loadWallet(
    mnemonic: string,
    path: string,
    accountName: string
  ): Promise<void> {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const rootKey = bip32.fromSeed(seed, this.network);
    const currentWalletNode = rootKey.derivePath(path);

    /**
     * @dev Assign values to current context
     */
    this.keypair = ECPair.fromWIF(currentWalletNode.toWIF(), this.network);
    this.signer = this.keypair;
    this.taprootSigner = currentWalletNode.tweak(
      Bitcoin.crypto.taggedHash(
        'TapTweak',
        this.toXOnly(this.keypair.publicKey)
      )
    );
    this.p2tr = Bitcoin.payments.p2tr({
      pubkey: this.toXOnly(this.taprootSigner.publicKey),
      network: this.network,
    });
    this.accountName = accountName;

    /**
     * @dev Dump to storage
     */
    this.storage.setItem(
      WalletProvider.WALLET_STORAGE_KEY,
      JSON.stringify({
        mnemonic,
        path,
        accountName,
      })
    );
  }

  /**
   * @notice Delete current wallet and initialize new wallet
   */
  public async resetWallet() {
    this.storage.removeItem(WalletProvider.WALLET_STORAGE_KEY);
    await this.restoreOrCreateWallet();
  }

  /**
   * @notice Get X-only pubkey
   * @param pubkey
   */
  public toXOnly(pubkey: Buffer): Buffer {
    return pubkey.subarray(1, 33);
  }

  /**
   * @notice Construct witness scripts
   * @param witness
   * @private
   */
  private witnessStackToScriptWitness(witness: Buffer[]) {
    let buffer = Buffer.allocUnsafe(0);

    function writeSlice(slice: Buffer) {
      buffer = Buffer.concat([buffer, Buffer.from(slice)]);
    }

    function writeVarInt(i: number) {
      const currentLen = buffer.length;
      const varintLen = varuint.encodingLength(i);

      buffer = Buffer.concat([buffer, Buffer.allocUnsafe(varintLen)]);
      varuint.encode(i, buffer, currentLen);
    }

    function writeVarSlice(slice: Buffer) {
      writeVarInt(slice.length);
      writeSlice(slice);
    }

    function writeVector(vector: Buffer[]) {
      writeVarInt(vector.length);
      vector.forEach(writeVarSlice);
    }

    writeVector(witness);

    return buffer;
  }

  /**
   * @notice
   * @param script
   * @param controlBlock
   * @private
   */
  public finalizeWithScriptWitness(script: Buffer, controlBlock: Buffer) {
    return (_inputIndex: number, input: any) => {
      const scriptSolution = [input.tapScriptSig[0].signature];

      const witness = scriptSolution.concat(script).concat(controlBlock);

      return {
        finalScriptWitness: this.witnessStackToScriptWitness(witness),
      };
    };
  }

  /**
   * @notice Detect if a wallet address is valid
   * @param address
   */
  public isValidAddress(address: string) {
    try {
      Bitcoin.address.toOutputScript(address, this.network);
      return true;
    } catch {
      return false;
    }
  }
}
