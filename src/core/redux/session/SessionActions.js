import { createAction } from 'redux-actions';
import MyBankingClientApi from '../../utils/MyBankingClientApi';

export default {
    login: createAction('LOGIN', () => { return MyBankingClientApi.login() }),
    logout: createAction('LOGOUT', () => { return MyBankingClientApi.logout() }),
    getStoredAuth: createAction('GET_STORED_AUTH', () => { return MyBankingClientApi.getStoredAuth() }),
    getProfile: createAction('GET_PROFILE', () => { return MyBankingClientApi.getProfile() })
} 