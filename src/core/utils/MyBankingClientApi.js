export default class MyBankingClientApi {

    static login() {
        return new Promise(function (resolve, reject) {
            //grab auth-data from local store and return
            resolve({});    
        })
    }

    static logout() {
        return new Promise(function (resolve, reject) {
            resolve({});    
        })
    }

}