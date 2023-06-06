import * as React from 'react';

import Seo from '@/components/Seo';
import SignTransaction from '@/components/Wallet/WalletAdvanced/Sign.transaction';

import NavigationLayout from '@/layouts/Navigation.layout';

export default function HomePage() {
  return (
    <main>
      <Seo title='Sign PSBT Transaction' />
      <NavigationLayout screenTitle='Sign PSBT Transaction'>
        <>
          <SignTransaction />
        </>
      </NavigationLayout>
    </main>
  );
}
