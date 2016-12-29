export default class MyBankingClientApi {

    static getStoredAuth() {
        return new Promise(function (resolve, reject) {
            //grab auth-data from local store and return
            resolve(JSON.parse(localStorage.getItem('auth-data')));
        })
    }

    static getProfile() {
        return new Promise(function (resolve, reject) {
            let profile = localStorage.getItem('profile');

            if (!profile) {
                //pretend we called an api for profile and are now storing it
                profile = { banks: {} };
                localStorage.setItem('profile', JSON.stringify(profile));
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
            localStorage.setItem('auth-data', JSON.stringify(auth_data));
            resolve(auth_data);
        })
    }

    static logout() {
        return new Promise(function (resolve, reject) {
            localStorage.clear();
            resolve({});
        })
    }

}