import { Button } from '@fluentui/react-button';
import { mergeClasses } from '@fluentui/react-components';
import {
  BroadActivityFeedRegular,
  QrCodeRegular,
  SendRegular,
} from '@fluentui/react-icons';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { useWallet } from '@/hooks/useWallet.hook';

const WalletNavigation: FC<{
  className?: string;
}> = (props) => {
  const router = useRouter();
  const wallet = useWallet();

  return (
    <>
      <div
        className={mergeClasses(
          'row flex items-center sm:hidden',
          props.className
        )}
      >
        <Button
          onClick={() => router.push('/receive')}
          className='mr-[8px]'
          icon={<QrCodeRegular />}
          size='medium'
        >
          Receive
        </Button>

        <Button
          onClick={() => router.push('/transfer')}
          className='mr-[8px]'
          icon={<SendRegular />}
          size='medium'
        >
          Transfer
        </Button>

        <Button
          onClick={() => window.open(wallet.activitiesLink, '_blank')}
          icon={<BroadActivityFeedRegular />}
          size='medium'
        >
          Activities
        </Button>
      </div>

      <div
        className={mergeClasses(
          'row hidden items-center justify-center sm:flex',
          props.className
        )}
      >
        <Button
          onClick={() => router.push('/receive')}
          className='mr-[16px]'
          icon={<QrCodeRegular />}
          size='medium'
        >
          Receive
        </Button>

        <Button
          onClick={() => router.push('/transfer')}
          className='mr-[16px]'
          icon={<SendRegular />}
          size='medium'
        >
          Transfer
        </Button>

        <Button
          onClick={() => window.open(wallet.activitiesLink, '_blank')}
          icon={<BroadActivityFeedRegular />}
          size='medium'
        >
          Activities
        </Button>
      </div>
    </>
  );
};

export default WalletNavigation;
