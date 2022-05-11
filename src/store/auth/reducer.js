const initState = {
    isLogin: false,
    userId: "",
    username: "",
    isLoadingAuth: false,
};

const authReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "auth/setLoginTrue":
            const { username, userId } = payload;
            return {
                ...state,
                isLogin: true,
                userId,
                username,
            };
        case "auth/setLoginFalse":
            return {
                ...state,
                isLogin: false,
                userId: "",
                username: "",
            };
        default:
            return state;
    }
};

export default authReducer;
