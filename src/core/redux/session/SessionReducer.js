const _initialState = {
    loggedIn: false,
    profile: null,
    nav: {
        items: [
            { page: "home", icon: "home", label: "Home" },
            { page: "accounts", icon: "account_balance_wallet", label: "Accounts" }
        ]
    }
}
const logoutNavItem = { page: "logout", icon: "done", label: "Logout" };
export default function (state = _initialState, action) {
    switch (action.type) {
        case 'GET_PROFILE':
            if (!action.error && action.payload) {
                return { ...state, loggedIn: true, profile: action.payload, nav: { items: [...state.nav.items, logoutNavItem] } }
            } else {
                return state;
            }
        case 'LOGOUT':
            return { ..._initialState }
        default:
            return state;
    }
}
