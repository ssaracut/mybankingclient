export default class BbvaApi {

    static getAuthToken(key) {

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
                console.log('Request succeeded with JSON response', data);
                localStorage.setItem('auth-data', JSON.stringify(data))
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });

    }

    static refreshAuthToken(token) {

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
                console.log('Request succeeded with JSON response', data);

                if (data.result.code === 401 && data.result.internal_code === "invalid_token") {
                    // redirect to login page
                    alert('You must re-authenticate to the bank as your access has expired.')                    
                } else {
                    localStorage.setItem('auth-data', JSON.stringify(data))
                }

            })
            .catch(function (error) {
                console.log('Request failed', error);
            });

    }

    static getAccounts() {

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
                console.log('Request succeeded with JSON response', data);
                if (data.result.code === 401 && data.result.internal_code === "invalid_token") {
                    this.refreshAuthToken(refresh);
                }
            }.bind(this))
            .catch(function (error) {
                console.log('Request failed', error);
            });

    }

}