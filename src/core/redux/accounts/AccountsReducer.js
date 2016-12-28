const _initialState = {
    accounts: null
}
export default function (state = _initialState, action) {
    switch (action.type) {
        case 'GET_ACCOUNTS':
            if (!action.error && action.payload) {
                return { ...state, accounts: parseAccounts(action.payload.response.accounts) }
            } else {
                return state;
            }
        case 'LOGOUT':
            return { ..._initialState };
        default:
            return state;
    }
}


function parseAccounts(accountsRaw) {
    let accounts = [];

    accountsRaw.forEach(function (a) {
        let account = {
            accountKey: a.accountKey,
            description: a.description,
            name: a.description,
            number: a.accountKey.substr(0, a.accountKey.indexOf(".")),
            classification: a.classification,
            balance: a.balance[0].amount
        };

        accounts.push(account);
    });

    return accounts;
}
