const _initialState = {
    accountState : {
        accounts: null,
        accountDetail: null,
        openDialog: false
    }
}
export default function (state = _initialState, action) {
    switch (action.type) {
        case 'GET_ACCOUNTS':
            if (!action.error && action.payload) {
                // return { ...state, accounts: parseAccounts(action.payload.data.accounts) }
                return {...state, accountState: {...state.accountState, accounts: parseAccounts(action.payload.data.accounts)}};
            } else {
                return state;
            }
        case 'GET_ACCOUNT_DETAILS':
            if (!action.error && action.payload) {
                return { ...state, accountState: {...state.accountState, accountDetail: action.payload }}
            } else {
                return state;
            }
        case 'GET_DIALOG_HANDLER':
            if (!action.error) {
                return { ...state, accountState: {...state.accountState, openDialog: action.payload }}
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
            balance: a.balance,
            currency: a.currency,
            detailLink: a.links.detail.href
        };

        accounts.push(account);
    });

    return accounts;
}
