import { createAction } from 'redux-actions';
import BbvaApi from '../../utils/BbvaApi';

export default {
    getAccounts: createAction('GET_ACCOUNTS', () => { return BbvaApi.getAccounts() }),
} 