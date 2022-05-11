const setAuth = (token) => {
    localStorage.setItem("userToken", JSON.stringify({ token }));
};

const removeAuth = () => {
    localStorage.removeItem("userToken");
};

export { setAuth, removeAuth };
