export default class BbvaApi {

    /*
        https://www.npmjs.com/package/react-cookie
        Should probably move the local storage to a cookie with path set, httponly = true, and secure = true
        to help make the access token and refresh token harder to grab by malicious code
    */

    /*
        Pretty sure I'm breaking rules by modifying the profile object directly here rather than having a subsequent
        action call since the redux session.profile value will be out of sync now.  Will fix this later.
    */

    static getAuthToken(key) {
        return new Promise(function (resolve, reject) {
            const profile = JSON.parse(localStorage.getItem('profile'));
            const authorization = btoa("app.bbva.mynewapp:gQZxI*hKVUF64ADt9BC34rmVT5Ztk0YtiQzBHv3LO2CtsIxS612q$xFBcawpJs4S");
            const url = `https://connect.bbva.com/token?grant_type=authorization_code&code=${key}&redirect_uri=https://localhost:3000/bbva`;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${authorization}`
                },
                mode: 'cors'
            }

            fetch(url, options)
                .then(response =>
                    response.json().then(json => ({
                        status: response.status,
                        data: json
                    })))
                .then(function (response) {
                    console.log('Token Request succeeded with JSON response', response);
                    if (response.status === 200) {
                        profile.banks.bbva = { auth_data: response.data };
                        localStorage.setItem('profile', JSON.stringify(profile));
                        resolve(response.data);
                    } else {
                        reject(response.data.result.info);
                    }
                })
                .catch(function (error) {
                    console.log('Token Request failed', error);
                    reject(error);
                });
        })
    }

    static refreshAuthToken(token) {
        return new Promise(function (resolve, reject) {
            const profile = JSON.parse(localStorage.getItem('profile'));
            const authorization = btoa("app.bbva.mynewapp:gQZxI*hKVUF64ADt9BC34rmVT5Ztk0YtiQzBHv3LO2CtsIxS612q$xFBcawpJs4S");
            const url = 'https://connect.bbva.com/token?grant_type=refresh_token';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${authorization}`
                },
                mode: 'cors',
                body: `refresh_token=${token}`

            }

            fetch(url, options)
                .then(response =>
                    response.json().then(json => ({
                        status: response.status,
                        data: json
                    })))
                .then(function (response) {
                    console.log('Token Request succeeded with JSON response', response.data);
                    if (response.status === 200) {
                        profile.banks.bbva = { auth_data: response.data };
                        localStorage.setItem('profile', JSON.stringify(profile));
                        resolve(response.data);
                    } else if (response.status === 401 && response.data.result.internal_code === "invalid_token") {
                        alert('You must re-authenticate to the bank as your access has expired.');
                        reject('You must re-authenticate to the bank as your access has expired.');;
                    } else {
                        reject(response.data.result.info);
                    }
                })
                .catch(function (error) {
                    console.log('Token Request failed', error);
                    reject(error);
                });
        })
    }

    static getAccounts() {
        return new Promise(function (resolve, reject) {
            const authorization = JSON.parse(localStorage.getItem('profile')).banks.bbva.auth_data.access_token;
            const refresh = JSON.parse(localStorage.getItem('profile')).banks.bbva.auth_data.refresh_token;
            const url = 'https://apis.bbva.com/accounts-sbx/v1/me/accounts';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${authorization}`
                },
                mode: 'cors'
            }

            fetch(url, options)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('Accounts Request succeeded with JSON response', data);
                    if (data.result.code === 200) {
                        resolve(data);
                    } else if (data.result.code === 401 && data.result.internal_code === "invalid_token") {
                        this.refreshAuthToken(refresh)
                            .then(function () { this.getAccounts() }.bind(this));
                        reject(data.result.info);
                    } else {
                        reject(data.result.info);
                    }
                }.bind(this))
                .catch(function (error) {
                    console.log('Accounts Request failed', error);
                    reject(error);
                });
        }.bind(this));
    }

    static getAccountTransactions(detailLink) {
        return new Promise(function (resolve, reject) {
            const authorization = JSON.parse(localStorage.getItem('profile')).banks.bbva.auth_data.access_token;
            const refresh = JSON.parse(localStorage.getItem('profile')).banks.bbva.auth_data.refresh_token;
            const url = `${detailLink}/transactions`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${authorization}`
                },
                mode: 'cors'
            }

            fetch(url, options)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('Account Transactions Request succeeded with JSON response', data);
                    if (data.result.code === 200 || data.result.code === 206) {
                        resolve(data);
                    } else if (data.result.code === 401 && data.result.internal_code === "invalid_token") {
                        this.refreshAuthToken(refresh);
                    } else {
                        reject(data.result.info);
                    }
                }.bind(this))
                .catch(function (error) {
                    console.log('Accounts Request failed', error);
                    reject(error);
                });
        }.bind(this));
    }

    static getBasicUserInfo() {
        return new Promise(function (resolve, reject) {
            const authorization = JSON.parse(localStorage.getItem('profile')).banks.bbva.auth_data.access_token;
            const refresh = JSON.parse(localStorage.getItem('profile')).banks.bbva.auth_data.refresh_token;
            const url = 'https://apis.bbva.com/customers-sbx/v1/me-basic';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `jwt ${authorization}`
                },
                mode: 'cors'
            }

            fetch(url, options)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('BasicUserInfo Request succeeded with JSON response', data);
                    if (data.result.code === 200) {
                        resolve(data);
                    } else if (data.result.code === 401 && data.result.internal_code === "invalid_token") {
                        this.refreshAuthToken(refresh)
                            .then(function () { this.getBasicUserInfo() }.bind(this));
                        reject(data.result.info);
                    } else {
                        reject(data.result.info);
                    }
                }.bind(this))
                .catch(function (error) {
                    console.log('BasicUserInfo Request failed', error);
                    reject(error);
                });
        }.bind(this));
    }
}