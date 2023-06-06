import { Button } from '@fluentui/react-button';
import { ArrowLeftRegular } from '@fluentui/react-icons';
import { useRouter } from 'next/router';
import { FC } from 'react';

const NavigationHeader: FC<{
  title: string;
}> = (props) => {
  const router = useRouter();

  return (
    <>
      <div className='row col-span-2 flex items-center justify-self-start'>
        <div className='row col-span-1 flex items-center justify-self-end'>
          <Button icon={<ArrowLeftRegular />} onClick={() => router.back()} />
        </div>

        <div className='ml-[8px]'>
          <h3>{props.title}</h3>
        </div>
      </div>
    </>
  );
};

export default NavigationHeader;
