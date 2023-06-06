import { Button } from '@fluentui/react-button';
import { Field, Textarea } from '@fluentui/react-components';
import { SignatureRegular } from '@fluentui/react-icons';
import { FC, useCallback, useState } from 'react';

import { useWallet } from '@/hooks/useWallet.hook';
import { toast } from 'react-toastify';

const SignMessage: FC = () => {
  const wallet = useWallet();
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState(
    'Result should appear here'
  );
  const [verified, setVerified] = useState(false);

  const handleSignMessage = useCallback(() => {
    const signedMessage = wallet.signMessage!(message);
    setSignedMessage(signedMessage);
    setVerified(wallet.verifySignature!(message, signedMessage));
    toast('Signed message successfully', { type: 'success' });
  }, [message]);

  return (
    <>
      <div className='row flex'>
        <Field size='large' label='Message' className='w-[100%]'>
          <Textarea
            size='large'
            resize='both'
            value={message}
            onChange={(event, data) => setMessage(data.value)}
          />
        </Field>
      </div>

      <div className='row mt-[32px] flex'>
        <Button icon={<SignatureRegular />} onClick={handleSignMessage}>
          Sign
        </Button>
      </div>

      <div className='mt-[32px]'>
        Result:
        <br />
        <div className={'break-all'}>{signedMessage}</div>
        <div className='mt-[24px]'>
          Verified: <br /> {verified.toString()}{' '}
        </div>
      </div>
    </>
  );
};

export default SignMessage;
