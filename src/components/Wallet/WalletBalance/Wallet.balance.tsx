import { Tab, TabList } from '@fluentui/react-components';
import { FC, useCallback, useState } from 'react';

import BRC20Balance from '@/components/Wallet/WalletBalance/BRC20.balance';
import NativeBalance from '@/components/Wallet/WalletBalance/Native.balance';
import OrdinalsBalance from '@/components/Wallet/WalletBalance/Ordinals.balance';

const WalletBalance: FC = (props) => {
  const [currentTab, setTab] = useState<string>('balance');

  const renderCurrentTab = useCallback(() => {
    if (currentTab === 'balance') return <NativeBalance />;
    if (currentTab === 'ordinals') return <OrdinalsBalance />;
    if (currentTab === 'brc-20') return <BRC20Balance />;
  }, [currentTab]);

  return (
    <div>
      <TabList
        {...props}
        defaultSelectedValue={currentTab}
        selectedValue={currentTab}
        onTabSelect={(event, data) => {
          setTab(data.value as string);
        }}
      >
        <Tab value='balance'>Balance</Tab>
        <Tab value='ordinals'>Ordinals</Tab>
        <Tab value='brc-20'>BRC-20</Tab>
      </TabList>

      <div className='mt-[20px]' />
      {renderCurrentTab()}
    </div>
  );
};

export default WalletBalance;
