import * as React from 'react';

import { useWallet } from '@/hooks/useWallet.hook';

import Seo from '@/components/Seo';
import WalletAccount from '@/components/Wallet/Wallet.account';
import WalletReceive from '@/components/Wallet/Wallet.receive';

import NavigationLayout from '@/layouts/Navigation.layout';

export default function () {
  const wallet = useWallet();
  return (
    <main>
      <Seo title='Receive' />
      <NavigationLayout screenTitle='Receive'>
        <>
          <WalletAccount walletNavigationDisabled={true} />
          <div className='mt-[56px] sm:mt-[120px]' />
          <WalletReceive address={wallet.taprootAddress || ''} />
        </>
      </NavigationLayout>
    </main>
  );
}
