import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import '@/styles/colors.css';

const WalletContextProvider = dynamic(() => import('@/hooks/useWallet.hook'), {
  ssr: false,
});

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FluentProvider theme={teamsDarkTheme}>
      <ToastContainer />
      <WalletContextProvider>
        <Component {...pageProps} />
      </WalletContextProvider>
    </FluentProvider>
  );
}

export default MyApp;
