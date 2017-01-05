/*
 This is just faking out a middleware that doesnt exist yet
*/
import BbvaApi from './BbvaApi'

export default class MyBankingClientMiddleware {

    static getApiAuthToken(api, key) {
        return new Promise(function (resolve, reject) {
            if (api === 'bbva') {
                BbvaApi.getAuthToken(key)
                    .then(function (data) { resolve(data); })
                    .catch(function (error) { reject(error); });
            }
        })
    }

    static getProfile() {
        return new Promise(function (resolve, reject) {
            let profile = JSON.parse(localStorage.getItem('profile'));

            //pretend we called an api for profile and are now storing it
            if (!profile) {
                profile = { banks: {} };
                localStorage.setItem('profile', JSON.stringify(profile));
            } else {
                //This should happen in the middleware that is upcoming.
                for (let bank in profile.bank) {
                    if (bank === 'bbva') {
                        BbvaApi.getBasicUserInfo()
                            .then(function (data) { })
                            .catch(function (error) { });
                    }
                }
            }
            resolve(profile);
        })
    }

    static setProfile(profile) {
        //fake a call to the api by storing in localstorage
        localStorage.setItem('profile', JSON.stringify(profile));
    }

    static login() {
        return new Promise(function (resolve, reject) {
            const auth_data = {};
            resolve(auth_data);
        })
    }

    static logout() {
        return new Promise(function (resolve, reject) {
            resolve({});
        })
    }

    static getAccounts() {
        return BbvaApi.getAccounts();
    }

    static getAccountTransactions(detailLink) {
        return BbvaApi.getAccountTransactions(detailLink);
    }
}