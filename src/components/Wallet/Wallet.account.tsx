import { Avatar, Button, mergeClasses } from '@fluentui/react-components';
import { CopyRegular, PersonAccountsRegular } from '@fluentui/react-icons';
import React, { FC, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import { useWallet } from '@/hooks/useWallet.hook';

import WalletNavigation from '@/components/Wallet/Wallet.navigation';

const WalletAccount: FC<{
  walletNavigationDisabled?: boolean;
}> = (props) => {
  const walletState = useWallet();

  const truncatedText = useMemo(() => {
    return `${walletState.taprootAddress?.slice(
      0,
      7
    )}...${walletState.taprootAddress?.slice(
      walletState.taprootAddress?.length - 7,
      walletState.taprootAddress?.length
    )}`;
  }, [walletState.taprootAddress]);

  const copyText = useCallback(async () => {
    if (window.navigator) {
      await navigator.clipboard.writeText(walletState.taprootAddress as string);
      toast('Copied', { type: 'success' });
    }
  }, [walletState.taprootAddress]);

  return (
    <>
      <div className={mergeClasses('row flex items-center')}>
        <Avatar
          size={56}
          className='mr-[16px] flex'
          shape='square'
          aria-label='square avatar'
          icon={<PersonAccountsRegular />}
        />

        <div className='account-info flex-1'>
          <h2>{walletState.accountName}</h2>
          <div>
            <div className='row flex items-center'>
              <div>{truncatedText}</div>
              <div className='ml-[16px]' />
              <Button size='small' icon={<CopyRegular />} onClick={copyText} />
            </div>
          </div>
        </div>

        {!props.walletNavigationDisabled && (
          <div className='hidden sm:block'>
            <WalletNavigation className='justify-self-end' />
          </div>
        )}
      </div>
    </>
  );
};

export default WalletAccount;
