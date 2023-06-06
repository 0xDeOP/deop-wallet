import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { NetworkProvider } from '@/lib/providers/Network.provider';
import { RPCProvider } from '@/lib/providers/Rpc.provider';
import { WalletProvider } from '@/lib/providers/Wallet.provider';
import { WalletService } from '@/lib/services/Wallet.service';

/**
 * @notice Define Wallet State
 */
export interface WalletState {
  isReady: boolean;
  taprootAddress: string;
  accountName: string;
  balance: number;
  activitiesLink: string;
  // Export functions
  createTransferPsbt: (toAddress: string, amount: number) => Promise<string>;
  signPsbt: (txHex: string) => string;
  signMessage: (text: string) => string;
  verifySignature: (text: string, hash: string) => boolean;
  broadcastTx: (txHex: string) => Promise<string>;
  getBalance: () => Promise<number>;
  resetWallet: () => void;
  isValidAddress: (address: string) => boolean;
  refresh: () => void;
}

/**
 * @dev Initialize context
 */
const WalletContext = createContext<Partial<WalletState>>({ isReady: false });

/**
 * @dev Export provider
 * @param props
 * @constructor
 */
const WalletContextProvider: FC<{ children: ReactNode }> = (props) => {
  /**
   * @dev Initialize wallet service
   */
  const rpcProvider = new RPCProvider(
    new NetworkProvider(window.fetch.bind(window))
  );
  const walletProvider = new WalletProvider('regtest', window.localStorage);
  const walletService = new WalletService(rpcProvider, walletProvider);

  /**
   * @dev Define context state that will be exposed to components
   */
  const [isReady, setReady] = useState(false);
  const [taprootAddress, setTaprootAddress] = useState('');
  const [accountName, setAccountName] = useState('');
  const [balance, setBalance] = useState(0);

  /**
   * @notice Initialize context state
   */
  const initialize = useCallback(async () => {
    await walletProvider.restoreOrCreateWallet();
    setReady(true);
    setTaprootAddress(walletProvider.getPayment().address as string);
    setAccountName(walletProvider.accountName);
    const { total } = await walletService.getAndConsumeUTXOs();
    setBalance(total / 1e8);
  }, []);

  /**
   * @notice Create transfer psbt
   */
  const createTransferPsbt = useCallback(
    (toAddress: string, amount: number) => {
      return walletService.createTransferPsbt(toAddress, amount * 1e8);
    },
    []
  );

  /**
   * @notice Create transfer psbt
   */
  const signPsbt = useCallback((txHex: string) => {
    return walletService.signPsbt(txHex);
  }, []);

  /**
   * @notice Create transfer psbt
   */
  const signMessage = useCallback((text: string) => {
    return walletService.signMessage(text);
  }, []);

  /**
   * @notice Create transfer psbt
   */
  const verifySignature = useCallback((text: string, hash: string) => {
    return walletService.verifySignature(text, hash);
  }, []);

  /**
   * @notice Create transfer psbt
   */
  const broadcastTx = useCallback((txHex: string) => {
    return walletService.broadcastRawTx(txHex);
  }, []);

  /**
   * @notice Create transfer psbt
   */
  const getBalance = useCallback(async () => {
    const utxos = await walletService.getAndConsumeUTXOs();
    return utxos.total;
  }, []);

  /**
   * @notice Create transfer psbt
   */
  const resetWallet = useCallback(() => {
    return walletProvider.resetWallet();
  }, []);

  /**
   * @notice Check if address is valid
   */
  const isValidAddress = useCallback((address: string) => {
    return walletProvider.isValidAddress(address);
  }, []);

  /**
   * @notice Check aggregate activities
   */
  const activitiesLink = useMemo(() => {
    return `${RPCProvider.BASE_RPC_HOST}/address/${taprootAddress}`;
  }, [taprootAddress]);

  useEffect(() => {
    initialize().then(async () => {
      console.log('data loaded');
    });
  }, []);

  return (
    <WalletContext.Provider
      value={{
        isReady,
        taprootAddress,
        accountName,
        createTransferPsbt,
        signPsbt,
        signMessage,
        verifySignature,
        broadcastTx,
        resetWallet,
        getBalance,
        balance,
        isValidAddress,
        refresh: initialize,
        activitiesLink,
      }}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

/** @dev Export use context function */
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('Muse be in context provider');
  }

  return context;
};

export default WalletContextProvider;
