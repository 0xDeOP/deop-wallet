import * as React from 'react';

import Seo from '@/components/Seo';
import WalletAdvanced from '@/components/Wallet/WalletAdvanced/Wallet.advanced';

import NavigationLayout from '@/layouts/Navigation.layout';

export default function () {
  return (
    <main>
      <Seo title='Advanced' />
      <NavigationLayout screenTitle='Advanced'>
        <>
          <WalletAdvanced />
        </>
      </NavigationLayout>
    </main>
  );
}
