import {
  Button,
  Caption1,
  Card,
  CardHeader,
  CardPreview,
  makeStyles,
  mergeClasses,
  shorthands,
  Text,
  tokens,
} from '@fluentui/react-components';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FC } from 'react';

import { useWallet } from '@/hooks/useWallet.hook';

const resolveAsset = () => {
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/1.png`;
};

const useStyles = makeStyles({
  main: {
    ...shorthands.gap('36px'),
    ...shorthands.border('0'),
    ...shorthands.padding('4px'),
    ...shorthands.borderRadius('8px'),
    marginTop: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    textAlign: 'left',
  },

  card: {
    maxWidth: '100%',
    height: 'fit-content',
    boxShadow: '0',
    backgroundColor: 'inherit',
  },

  title: {
    ...shorthands.margin(0, 0, '12px'),
  },

  horizontalCardImage: {
    width: '48px',
    height: '48px',
  },

  headerImage: {
    ...shorthands.borderRadius('4px'),
    maxWidth: '42px',
    maxHeight: '42px',
  },

  caption: {
    color: tokens.colorNeutralForeground3,
  },

  text: {
    ...shorthands.margin(0),
  },
});

export const BalanceCard = () => {
  const styles = useStyles();
  const router = useRouter();
  const walletState = useWallet();

  return (
    <Button
      className={mergeClasses(styles.main)}
      onClick={() => router.push('/transfer')}
    >
      <section className={mergeClasses('w-[100%]')}>
        <Card
          className={mergeClasses(styles.card, 'w-[100%]')}
          orientation='horizontal'
        >
          <CardPreview className={styles.horizontalCardImage}>
            <img
              className={mergeClasses(styles.horizontalCardImage)}
              src={resolveAsset()}
              alt='Bitcoin Assets'
            />
          </CardPreview>

          <CardHeader
            header={<Text weight='semibold'>{walletState.balance} BTC</Text>}
            description={
              <Caption1 className={styles.caption}>Bitcoin</Caption1>
            }
          />
        </Card>
      </section>
    </Button>
  );
};

const NativeBalance: FC = () => {
  return (
    <>
      <BalanceCard />
    </>
  );
};

export default NativeBalance;
