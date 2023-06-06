import * as React from 'react';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Seo from '@/components/Seo';
import WalletAccount from '@/components/Wallet/Wallet.account';
import WalletNavigation from '@/components/Wallet/Wallet.navigation';
import WalletBalance from '@/components/Wallet/WalletBalance/Wallet.balance';

import MainLayout from '@/layouts/Main.layout';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function () {
  return (
    <main>
      <Seo title='DeOP | Testnet Wallet' />
      <MainLayout>
        <>
          <WalletAccount />
          <div className='mt-[24px]' />

          <div className='block sm:hidden'>
            <WalletNavigation />
          </div>

          <div className='mt-[24px]' />
          <WalletBalance />
        </>
      </MainLayout>
    </main>
  );
}
