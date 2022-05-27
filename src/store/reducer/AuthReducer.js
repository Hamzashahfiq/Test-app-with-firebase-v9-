const initialState = {
    isLoginUser: false,
    user: null,
    isLogout:false
}

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGOUT": {
            return {
                ...state,
                isLoginUser: false,
                user: null,
                isLogout:true
            }
        }

        case "LOGIN": {
            return {
                ...state,
                isLoginUser: true,
                user: action.payload,
                isLogout:false
                
            }
        }
      

        default:
            return state;
    }
}
