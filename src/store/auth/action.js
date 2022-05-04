const SET_LOGIN_TRUE = (username) => {
    return {
        type: "auth/setLoginTrue",
        payload: {
            username,
        },
    };
};
const SET_LOGIN_FALSE = () => {
    return {
        type: "auth/setLoginFalse",
    };
};

const SET_LOADING_AUTH_TRUE = () => {
    return {
        type: "auth/setLoadingAuthTrue",
    };
};

const SET_LOADING_AUTH_FALSE = () => {
    return {
        type: "auth/setLoadingAuthFalse",
    };
};

export { SET_LOGIN_TRUE, SET_LOGIN_FALSE, SET_LOADING_AUTH_TRUE, SET_LOADING_AUTH_FALSE };
