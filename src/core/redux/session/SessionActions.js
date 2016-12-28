import { createAction } from 'redux-actions';
import security from '../../../core/utils/SecurityService';

export default {
    getProfile: createAction('GET_PROFILE', (loginIfRequired) => { return security.getProfile(loginIfRequired) }),
    logout: createAction('LOGOUT', () => { return security.logout() })
} 