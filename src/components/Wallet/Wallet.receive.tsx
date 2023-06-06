import QRCode from 'qrcode.react';
import { FC } from 'react';

const WalletReceive: FC<{
  address: string;
}> = (props) => {
  return (
    <>
      <div className='grid grid-rows-1'>
        <div className='justify-self-center rounded border-[1px] border-white p-[16px]'>
          <QRCode value={props.address || ''} renderAs='svg' size={180} />
        </div>
      </div>
      <div className='mt-[16px] grid grid-rows-1 text-center'>
        <h4 className='text-red-600'>
          Testnet Alert! Do not send real Bitcoin to this address{' '}
        </h4>
      </div>
    </>
  );
};

export default WalletReceive;
