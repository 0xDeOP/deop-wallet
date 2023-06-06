import {
  makeStyles,
  MenuItem,
  MenuList,
  tokens,
} from '@fluentui/react-components';
import {
  ArrowUndoRegular,
  PenRegular,
  SignatureRegular,
} from '@fluentui/react-icons';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { useWallet } from '@/hooks/useWallet.hook';

const useMenuListContainerStyles = makeStyles({
  container: {
    minHeight: '48px',
    width: '100%',
    boxShadow: `${tokens.shadow16}`,
  },
});

const WalletAdvanced = () => {
  const styles = useMenuListContainerStyles();
  const router = useRouter();
  const wallet = useWallet();

  const handleReset = useCallback(() => {
    wallet.resetWallet!();
    wallet.refresh!();

    toast('Wallet reset successfully', { type: 'success' });

    setTimeout(() => {
      router.push('/');
    }, 1000);
  }, [wallet.isReady]);

  return (
    <div className={styles.container}>
      <MenuList>
        <MenuItem
          className='h-[48px]'
          icon={<SignatureRegular />}
          onClick={() => router.push('/advanced/sign-message')}
        >
          Sign Message
        </MenuItem>
        <MenuItem
          className='h-[48px]'
          icon={<PenRegular />}
          onClick={() => router.push('/advanced/sign-transaction')}
        >
          Sign Raw PSBT Transaction
        </MenuItem>
      </MenuList>

      <MenuList className='mt-[32px]'>
        <MenuItem
          className='h-[48px]'
          icon={<ArrowUndoRegular />}
          onClick={handleReset}
        >
          Reset Wallet
        </MenuItem>
      </MenuList>
    </div>
  );
};

export default WalletAdvanced;
