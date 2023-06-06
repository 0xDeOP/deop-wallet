import { Field, Input, InputProps, Label } from '@fluentui/react-components';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTrigger,
} from '@fluentui/react-components';
import { SendRegular } from '@fluentui/react-icons';
import { FC, useCallback, useMemo, useState } from 'react';
import * as React from 'react';
import { toast } from 'react-toastify';

import { useWallet } from '@/hooks/useWallet.hook';

export const TransferForm = (props: InputProps) => {
  const wallet = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const [confirmDialogOpen, setDialogOpen] = useState(false);

  const errors = useMemo(() => {
    if (wallet.isReady && showValidation) {
      const isValidAddress = wallet.isValidAddress!(recipient);
      const isBalanceSufficient =
        amount <= Number(wallet.balance) &&
        Number(wallet.balance) > 0 &&
        amount > 0;

      return {
        recipientError: {
          text: isValidAddress ? 'The address is valid' : 'Invalid address',
          state: isValidAddress ? 'success' : 'error',
          isValid: isValidAddress,
        },
        amount: {
          text: isBalanceSufficient
            ? 'Sufficient balance'
            : 'Insufficient balance',
          state: isBalanceSufficient ? 'success' : 'error',
          isValid: isBalanceSufficient,
        },
        isValid: isValidAddress && isBalanceSufficient,
      };
    }

    return {
      recipientError: {
        text: '',
        state: '',
        isValid: false,
      },
      amount: {
        text: '',
        state: '',
        isValid: false,
      },
      isValid: false,
    };
  }, [wallet.isReady, wallet.balance, amount, recipient, showValidation]);

  const selectMaxBalance = useCallback(() => {
    setAmount(wallet.balance as number);
  }, [wallet.balance]);

  const pasteAddress = useCallback(() => {
    if (window.navigator) {
      navigator.clipboard.readText().then((value) => {
        setRecipient(value);
      });
    }
  }, []);

  const handleClickSend = useCallback(async () => {
    if (errors.isValid) {
      setDialogOpen(true);
    }
  }, [wallet.isReady, errors]);

  const confirmTransaction = useCallback(async () => {
    const tx = await wallet.createTransferPsbt!(recipient, amount);
    await wallet.broadcastTx!(tx)
      .then(() => {
        toast('Transaction submitted', { type: 'success' });
        wallet.refresh!();
        setShowValidation(false);
        setRecipient('');
        setAmount(0);
      })
      .catch(() => {
        toast('Failed to submit transaction', { type: 'error' });
      });
    setDialogOpen(false);
  }, [wallet, amount, recipient]);

  return (
    <>
      <div className='row flex justify-center'>
        <Field
          validationState={errors.recipientError.state as any}
          validationMessage={errors.recipientError.text}
          label={
            <Label
              className='row flex items-center justify-between'
              htmlFor='recipient'
              size={props.size}
              disabled={props.disabled}
            >
              <h4>Recipient</h4>
            </Label>
          }
          className='w-[100%]'
        >
          <Input
            size='large'
            value={recipient}
            onChange={(target, data) => {
              setRecipient(data.value);
              setShowValidation(true);
            }}
          />
          <div className='row mt-[8px] flex items-center justify-end'>
            <Button className='ml-[4px]' size='small' onClick={pasteAddress}>
              Paste
            </Button>
          </div>
        </Field>
      </div>

      <div className='row mt-[24px] flex justify-center'>
        <Field
          validationState={errors.amount.state as any}
          validationMessage={errors.amount.text}
          label={
            <Label
              className='row flex items-center justify-between'
              htmlFor='amount'
              size={props.size}
              disabled={props.disabled}
            >
              <h4>Amount</h4>
            </Label>
          }
          className='w-[100%]'
        >
          <Input
            type='number'
            size='large'
            value={amount.toString()}
            onChange={(event, data) => {
              setAmount(Number(data.value));
              setShowValidation(true);
            }}
          />
          <div className='row mt-[8px] flex items-center justify-end'>
            Balance: {wallet.balance} BTC
            <Button
              className='ml-[4px]'
              size='small'
              onClick={selectMaxBalance}
            >
              Max
            </Button>
          </div>
        </Field>
      </div>

      <div className='row mt-[64px] flex'>
        <Dialog
          open={confirmDialogOpen}
          onOpenChange={(event, data) => {
            setDialogOpen(data.open);
          }}
        >
          <Button
            icon={<SendRegular />}
            size='large'
            className='w-[100%] sm:w-[inherit]'
            onClick={handleClickSend}
          >
            Send
          </Button>
          <DialogSurface>
            <DialogBody>
              <DialogContent>Confirm transaction?</DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance='secondary'>Close</Button>
                </DialogTrigger>
                <Button onClick={confirmTransaction} appearance='primary'>
                  Confirm
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </div>
    </>
  );
};

const WalletTransfer: FC = () => {
  return <TransferForm />;
};

export default WalletTransfer;
