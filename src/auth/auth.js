const setAuth = (token) => {
    localStorage.setItem("userToken", JSON.stringify({ token }));
};

export { setAuth };
