import { FC, ReactNode } from 'react';

import MainFooter from '@/components/Footer/Main.footer';
import NavigationHeader from '@/components/Header/Navigation.header';

const MainLayout: FC<{
  children: ReactNode;
  screenTitle: string;
}> = (props) => {
  return (
    <div className='absolute h-screen w-screen bg-black'>
      <div className='grid h-screen grid-cols-12 grid-rows-6 gap-4'>
        <div className='col-span-10 col-start-2 row-span-1 grid grid-cols-2 grid-rows-1 items-center sm:col-span-6 sm:col-start-4'>
          <NavigationHeader title={props.screenTitle} />
        </div>

        <div className='col-span-10 col-start-2 row-span-5 overflow-auto sm:col-span-6 sm:col-start-4'>
          {props.children}
        </div>

        <div className='col-span-10 col-start-2 row-span-1 items-center sm:col-span-6 sm:col-start-4'>
          <MainFooter />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
