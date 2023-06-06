import { Button } from '@fluentui/react-button';
import { Field, Textarea } from '@fluentui/react-components';
import { SendRegular, SignatureRegular } from '@fluentui/react-icons';
import { FC, useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import { useWallet } from '@/hooks/useWallet.hook';

const SignTransaction: FC = () => {
  const wallet = useWallet();
  const [txHex, setTxHex] = useState('');
  const [signedHex, setSignedHex] = useState('Result should appear here');

  const handleSign = useCallback(() => {
    if (wallet.isReady && txHex) {
      try {
        setSignedHex(wallet.signPsbt!(txHex));
        toast('Sign successfully', { type: 'success' });
      } catch {
        toast('Failed to sign tx', { type: 'error' });
      }
    }
  }, [wallet.isReady, txHex]);

  const handleSignAndSend = useCallback(() => {
    if (wallet.isReady && txHex) {
      try {
        const signedTx = wallet.signPsbt!(txHex);

        setSignedHex(signedTx);

        wallet.broadcastTx!(signedTx)
          .then(() => {
            toast('Submitted tx successfully', { type: 'success' });
          })
          .catch(() => {
            toast('Failed to submit tx', { type: 'error' });
          });
      } catch {
        toast('Failed to sign tx', { type: 'error' });
      }
    }
  }, [wallet.isReady, txHex]);

  return (
    <>
      <div className='row flex'>
        <Field
          size='large'
          label='PSBT Transaction in Hex'
          className='w-[100%]'
        >
          <Textarea
            value={txHex}
            onChange={(event, data) => setTxHex(data.value)}
            size='large'
            resize='both'
          />
        </Field>
      </div>

      <div className='row mt-[32px] flex'>
        <Button
          icon={<SignatureRegular />}
          className='mr-[16px]'
          onClick={handleSign}
        >
          Sign
        </Button>
        <Button icon={<SendRegular />} onClick={handleSignAndSend}>
          Sign & Send
        </Button>
      </div>

      <div className='mt-[32px]'>
        Result:
        <br />
        <div className='max-w-[100%] break-all'>{signedHex}</div>
      </div>
    </>
  );
};

export default SignTransaction;
