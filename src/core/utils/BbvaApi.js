export default class BbvaApi {

    static getAuthToken(key) {
        return new Promise(function (resolve, reject) {
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
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('Token Request succeeded with JSON response', data);
                    if (!data.result) {
                        localStorage.setItem('auth-data', JSON.stringify(data));
                        resolve(data);
                    } else {
                        reject(data.result.info);
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
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log('Token Request succeeded with JSON response', data);
                    if (data.result.code === 200) {
                        localStorage.setItem('auth-data', JSON.stringify(data));
                        resolve(data);
                    } else if (data.result.code === 401 && data.result.internal_code === "invalid_token") {
                        alert('You must re-authenticate to the bank as your access has expired.');
                    } else {
                        reject(data.result.info);
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

            const authorization = JSON.parse(localStorage.getItem('auth-data')).access_token;
            const refresh = JSON.parse(localStorage.getItem('auth-data')).refresh_token;
            const url = `https://apis.bbva.com/accounts-sbx/v1/me/accounts`;
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
                    } else {
                        reject(data.result.info);
                    }
                }.bind(this))
                .catch(function (error) {
                    console.log('Accounts Request failed', error);
                    reject(error);
                });
        });
    }

}