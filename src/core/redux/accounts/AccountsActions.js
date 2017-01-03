import { createAction } from 'redux-actions';
import MyBankingClientApi from '../../utils/MyBankingClientApi';
import BbvaApi from '../../utils/BbvaApi';

export default {
    getAccounts: createAction('GET_ACCOUNTS', () => {
        return BbvaApi.getAccounts()
    }),
    getAccountTransactions: createAction('GET_ACCOUNT_TRANSACTIONS', (detailLink) => {
        return BbvaApi.getAccountTransactions(detailLink)
    }),
    getDialogHandler: createAction('GET_DIALOG_HANDLER', (openDialog) => {
        return MyBankingClientApi.dialogHandler(openDialog)
    })
}