import bcrypt from "bcryptjs";

const setAuth = (token) => {
    localStorage.setItem("userToken", JSON.stringify({ token }));
};

const removeAuth = () => {
    localStorage.removeItem("userToken");
};

const getHashText = (text) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
};

const checkIsHashTextSame = async (text1, text2) => {
    const isHashTextSame = await bcrypt.compare(text1, text2);
    return isHashTextSame;
};

export { setAuth, removeAuth, getHashText, checkIsHashTextSame };
