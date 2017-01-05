/*
 This is just faking out a middleware that doesnt exist yet
*/
import BbvaApi from './BbvaApi'

const ApiAdapters = {
    bbva: BbvaApi
}

export default class MyBankingClientMiddleware {

    static getApiAuthToken(bank, key) {
        return new Promise(function (resolve, reject) {
            const profile = JSON.parse(localStorage.getItem('profile'));
            ApiAdapters[bank].getAuthToken(key)
                .then(function (data) {
                    profile.banks[bank] = { auth_data: data };
                    localStorage.setItem('profile', JSON.stringify(profile));
                    resolve(data);
                })
                .catch(function (error) { reject(error); });
        })
    }

    static getProfile() {
        return new Promise(function (resolve, reject) {

            //get profile from datastore
            let profile = JSON.parse(localStorage.getItem('profile'));

            //if datastore is empty load it with a fake profile
            if (!profile) {
                profile = { banks: {} };
                localStorage.setItem('profile', JSON.stringify(profile));
            }

            //grab basic profile info from each registered bank
            for (let bank in profile.banks) {
                ApiAdapters[bank].getBasicUserInfo()
                    .then(function (data) { })
                    .catch(function (error) { });

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