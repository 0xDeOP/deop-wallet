import * as Bitcoin from 'bitcoinjs-lib';

import { OrdinalsProvider } from '@/lib/providers/Ordinals.provider';
import { RPCProvider, UTXO } from '@/lib/providers/Rpc.provider';
import { WalletProvider } from '@/lib/providers/Wallet.provider';

export class WalletService {
  /**
   * @dev The constructor initializes the `WalletService`
   * @param rpcProvider
   * @param walletProvider
   */
  constructor(
    private readonly rpcProvider: RPCProvider,
    private readonly walletProvider: WalletProvider
  ) {}

  /**
   * @notice Get and consume utxos
   */
  public async getAndConsumeUTXOs(): Promise<{ total: number; utxos: UTXO[] }> {
    /**
     * @dev Fetch raw UTXO
     */
    const rawUtxos = await this.rpcProvider.getUTXOs(
      this.walletProvider.getPayment().address as string
    );

    /**
     * @dev Filter out the utxo contains ordinals to avoid Ordinals loss
     */
    const utxos = rawUtxos.filter(
      (elm) => elm.value !== OrdinalsProvider.ORDINALS_SATS_POSTAGE
    );

    /**
     * @dev Now we compute the total balance the address owns
     */
    const total = utxos.reduce((accum, val) => {
      return accum + val.value;
    }, 0);

    /**
     * @dev Return the result
     */
    return {
      total,

      /**
       * @dev Here we also fetch the transaction hex
       */
      utxos: utxos,
    };
  }

  /**
   * @dev Create the unsigned transfer PSBT
   * @param toAddress
   * @param amount
   */
  public async createTransferPsbt(
    toAddress: string,
    amount: number
  ): Promise<string> {
    /**
     * @dev Initialize payment and signer objects
     */
    const payment = this.walletProvider.getPayment();
    const signer = this.walletProvider.getSigner();

    /**
     * @dev Fetch unspent output
     */
    const utxos = await this.getAndConsumeUTXOs();

    /**
     * @dev Construct transaction with inputs and outputs
     */
    const psbt = new Bitcoin.Psbt({ network: this.walletProvider.network });
    psbt.addInputs(
      utxos.utxos.map((utxo) => ({
        index: utxo.vout,
        hash: utxo.txid,
        witnessUtxo: { value: utxo.value, script: payment.output as Buffer },
        tapInternalKey: this.walletProvider.toXOnly(signer.publicKey),
      }))
    );
    psbt.addOutputs([
      {
        address: toAddress,
        value: amount,
      },
      {
        address: payment.address as string,
        value: utxos.total - amount - RPCProvider.BASE_FEE,
      },
    ]);

    psbt.signAllInputs(this.walletProvider.getTaprootSigner());
    psbt.finalizeAllInputs();

    return psbt.extractTransaction().toHex();
  }

  /**
   * @dev Create the unsigned transfer PSBT
   * @param toAddress
   * @param amount
   */
  public async createUnsignedTransferPSBT(
    toAddress: string,
    amount: number
  ): Promise<string> {
    /**
     * @dev Initialize payment and signer objects
     */
    const payment = this.walletProvider.getPayment();
    const signer = this.walletProvider.getSigner();

    /**
     * @dev Fetch unspent output
     */
    const utxos = await this.getAndConsumeUTXOs();

    /**
     * @dev Construct transaction with inputs and outputs
     */
    const psbt = new Bitcoin.Psbt({ network: this.walletProvider.network });
    psbt.addInputs(
      utxos.utxos.map((utxo) => ({
        index: utxo.vout,
        hash: utxo.txid,
        witnessUtxo: { value: utxo.value, script: payment.output as Buffer },
        tapInternalKey: this.walletProvider.toXOnly(signer.publicKey),
      }))
    );
    psbt.addOutputs([
      {
        address: toAddress,
        value: amount,
      },
      {
        address: payment.address as string,
        value: utxos.total - amount - RPCProvider.BASE_FEE,
      },
    ]);

    return psbt.toHex();
  }

  /**
   * @notice Sign psbt
   * @param hex
   */
  public signPsbt(hex: string): string {
    const signer = this.walletProvider.getTaprootSigner();
    const psbt = Bitcoin.Psbt.fromHex(hex);

    for (let i = 0; i < psbt.inputCount; i++) {
      psbt.signInput(i, signer);
    }

    /**
     * @dev Finalize all inputs
     */
    psbt.finalizeAllInputs();

    return psbt.extractTransaction().toHex();
  }

  /**
   * @notice Broadcast tx
   * @param txHex
   */
  public broadcastRawTx(txHex: string): Promise<string> {
    return this.rpcProvider.sendRawTx(txHex);
  }

  /**
   * @dev Sign message
   * @param text
   */
  public signMessage(text: string) {
    const messageSigner = this.walletProvider.getMessageSigner();
    return messageSigner.sign(text);
  }

  /**
   * @dev Sign message
   * @param text
   * @param signatureHash
   */
  public verifySignature(text: string, signatureHash: string) {
    const messageSigner = this.walletProvider.getMessageSigner();
    return messageSigner.verify(text, signatureHash);
  }
}
