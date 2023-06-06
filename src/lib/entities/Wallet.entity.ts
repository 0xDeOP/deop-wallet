export type NetworkKey = 'bitcoin' | 'regtest' | 'testnet';

export interface WalletEntity {
  derivedPath: string;
  mnemonic: string;
  networkKey: NetworkKey;
}
