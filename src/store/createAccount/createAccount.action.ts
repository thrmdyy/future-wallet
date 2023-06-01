import { createAction } from '@reduxjs/toolkit';
import { CreateAccountSteps } from './createAccount.types';

const setStep = createAction<CreateAccountSteps>('@createAccount/setStep');

const setSeedPhrase = createAction<string[]>('@createAccount/setSeedPhrase');

const setPassword = createAction<string>('@createAccount/setPassword');

export const createAccountActions = {
    setStep,
    setSeedPhrase,
    setPassword,
};
