import { FC, ReactNode } from 'react';

import MainFooter from '@/components/Footer/Main.footer';
import MainHeader from '@/components/Header/Main.header';

const MainLayout: FC<{
  children: ReactNode;
}> = (props) => {
  return (
    <div className='absolute h-screen w-screen bg-black'>
      <div className='grid h-screen grid-cols-12 grid-rows-6 gap-4'>
        <div className='col-span-10 col-start-2 row-span-1 grid grid-cols-2 grid-rows-1 items-center sm:col-span-8 sm:col-start-3'>
          <MainHeader />
        </div>

        <div className='col-span-10 col-start-2 row-span-5 overflow-auto sm:col-span-8 sm:col-start-3'>
          {props.children}
        </div>

        <div className='col-span-10 col-start-2 row-span-1 items-center sm:col-span-8 sm:col-start-3'>
          <MainFooter />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
