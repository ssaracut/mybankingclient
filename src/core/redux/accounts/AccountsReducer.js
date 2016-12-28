const _initialState = {
    accounts: null
}
export default function (state = _initialState, action) {
    switch (action.type) {
        case 'GET_ACCOUNTS':
            if (!action.error && action.payload) {
                return { ...state, accounts: parseAccounts(action.payload.data.accounts) }
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
            accountKey: a.id,
            description: a.description,
            name: a.description,
            number: a.number,
            classification: a.type,
            balance: a.balance
        };

        accounts.push(account);
    });

    return accounts;
}
