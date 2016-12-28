import { createAction } from 'redux-actions';
import MyBankingClientApi from '../../utils/MyBankingClientApi';

export default {
    login: createAction('LOGIN', () => { return MyBankingClientApi.login() }),
    logout: createAction('LOGOUT', () => { return MyBankingClientApi.logout() })
} 