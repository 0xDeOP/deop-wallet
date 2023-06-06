import * as React from 'react';

import Seo from '@/components/Seo';
import SignMessage from '@/components/Wallet/WalletAdvanced/Sign.message';

import NavigationLayout from '@/layouts/Navigation.layout';

export default function () {
  return (
    <main>
      <Seo title='Sign Message' />
      <NavigationLayout screenTitle='Sign Message'>
        <>
          <SignMessage />
        </>
      </NavigationLayout>
    </main>
  );
}
