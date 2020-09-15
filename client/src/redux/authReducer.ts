const initialState = {
    id: 0,
    login: '',
    email: '',
    rememberMe: false,
    isAuthorized: false
}

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state
    }
}