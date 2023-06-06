import { Button } from '@fluentui/react-button';
import { Settings32Regular } from '@fluentui/react-icons';
import { useRouter } from 'next/router';
import { FC } from 'react';

import NextImage from '@/components/NextImage';

const MainHeader: FC = () => {
  const router = useRouter();

  return (
    <>
      <div className='row col-span-1 flex items-center justify-self-start'>
        <NextImage
          imgClassName='rounded'
          alt='DeOP wallet'
          src='/images/logo.original.jpeg'
          height={48}
          width={48}
        />
        <div className='ml-[8px]'>
          <h4>DeOP Wallet</h4>{' '}
          <span className='font-bold text-red-600'>(testnet)</span>
        </div>
      </div>

      <div className='row col-span-1 flex items-center justify-self-end'>
        <Button
          icon={<Settings32Regular />}
          onClick={() => router.push('/advanced')}
        />
      </div>
    </>
  );
};

export default MainHeader;
