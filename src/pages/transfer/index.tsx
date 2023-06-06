import * as React from 'react';

import Seo from '@/components/Seo';
import WalletAccount from '@/components/Wallet/Wallet.account';
import WalletTransfer from '@/components/Wallet/Wallet.transfer';

import NavigationLayout from '@/layouts/Navigation.layout';

export default function () {
  return (
    <main>
      <Seo title='Send BTC' />
      <NavigationLayout screenTitle='Send BTC'>
        <>
          <WalletAccount walletNavigationDisabled={true} />
          <div className='mt-[56px]' />
          <WalletTransfer />
        </>
      </NavigationLayout>
    </main>
  );
}
