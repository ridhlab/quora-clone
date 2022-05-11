const SET_LOGIN_TRUE = (userId, username) => {
    return {
        type: "auth/setLoginTrue",
        payload: {
            userId,
            username,
        },
    };
};
const SET_LOGIN_FALSE = () => {
    return {
        type: "auth/setLoginFalse",
    };
};

export { SET_LOGIN_TRUE, SET_LOGIN_FALSE };
