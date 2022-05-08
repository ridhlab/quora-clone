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
        case "auth/setLoadingAuthTrue":
            return {
                ...state,
                isLoadingAuth: true,
            };
        case "auth/setLoadingAuthFalse":
            console.log("reducer");
            return {
                ...state,
                isLoadingAuth: false,
            };
        default:
            return state;
    }
};

export default authReducer;
