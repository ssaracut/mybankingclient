const _initialState = {
    session: {
        loggedIn: false,
        auth_data: undefined,
        nav: {
            items: [
                { page: "", icon: "home", label: "Home" }
            ]
        },
        options: [{ page: "login", icon: "done", label: "Login" }]
    }
}
const loggedInNav = {
    items: [
        { page: "", icon: "home", label: "Home" },
        { page: "accounts", icon: "account_balance_wallet", label: "Accounts" },
        { page: "profiles", icon: "account_balance_wallet", label: "Profiles" }
    ]
}
const logoutOption = { page: "logout", icon: "done", label: "Logout" };

export default function (state = _initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            if (!action.error && action.payload) {
                //return { ...state, session: { ...state.session, loggedIn: true, options: [...state.session.options, logoutOption] } }
                return { ...state, session: { ...state.session, loggedIn: true, nav: loggedInNav, options: [logoutOption] } }
            } else {
                return state;
            }
        case 'LOGOUT':
            return { ..._initialState }
        default:
            return state;
    }
}
