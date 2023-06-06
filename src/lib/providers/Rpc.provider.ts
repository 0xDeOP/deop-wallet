import { NetworkProvider } from './Network.provider';

export interface Status {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}
/**
 * @dev UTXO interface
 */
export interface UTXO {
  txid: string;
  vout: number;
  status: Status;
  value: number;
  hex?: string;
}

export interface VOut {
  scriptpubkey: string;
  scriptpubkey_asm: string;
  scriptpubkey_type: string;
  scriptpubkey_address: string;
  value: number;
}

export interface VIn {
  txid: string;
  vout: number;
  prevout: VOut;
  scriptsig: string;
  scriptsig_asm: string;
  witness: string[];
  is_coinbase: boolean;
  sequence: number;
}

export interface Transaction {
  txid: string;
  version: number;
  locktime: number;
  vin: VIn[];
  vout: VOut[];
  size: number;
  weight: number;
  fee: number;
  status: Status;
}

/**
 * @dev Define Bitcore Provider
 */
export class RPCProvider {
  /**
   * @dev properties
   */
  public static BASE_FEE = 450000;
  public static BASE_RPC_HOST = 'https://scan.deop.pro/regtest';
  private readonly rpcBaseURL: string;

  constructor(private readonly networkProvider: NetworkProvider) {
    this.rpcBaseURL = RPCProvider.BASE_RPC_HOST;
  }

  /**
   * @dev Get Transaction hex
   * @param txId
   */
  public async getTransaction(txId: string): Promise<Transaction> {
    return this.networkProvider.request<Transaction>(
      `${this.rpcBaseURL}/api/tx/${txId}`
    );
  }

  /**
   * @dev Get Transaction hex
   * @param txId
   */
  public async getTransactionHex(txId: string): Promise<string> {
    return this.networkProvider.request<string>(
      `${this.rpcBaseURL}/api/tx/${txId}/hex`
    );
  }

  /**
   * @dev Get Transaction hex
   * @param txId
   */
  public async getTransactionRaw(txId: string): Promise<string> {
    return this.networkProvider.request<string>(
      `${this.rpcBaseURL}/api/tx/${txId}/raw`
    );
  }

  /**
   * @dev Get UTXOs
   * @param address
   */
  public async getUTXOs(address: string): Promise<UTXO[]> {
    return this.networkProvider.request<UTXO[]>(
      `${this.rpcBaseURL}/api/address/${address}/utxo`
    );
  }

  /**
   * @dev Send raw tx
   * @param txHash
   */
  public async sendRawTx(txHash: string): Promise<string> {
    return this.networkProvider.request<string>(`${this.rpcBaseURL}/api/tx`, {
      method: 'POST',
      headers: {
        ['content-type']: 'text/plain',
      },
      body: txHash,
    });
  }
}
