import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Components
import Card from "../../../Components/Card";
import Logo from "../../../Components/Logo";
import WrapperAuth from "../../../Components/WrapperAuth";
import { ErrorMessage, ErrorMessageWithCard } from "../../../Components/AuthErrorMessage";

// GraphQL
import userMutation from "../../../GraphQL/user/mutation";
import { useMutation } from "@apollo/client";

// Hooks
import useUsernameExist from "../../../hooks/useUsernameExist";

// Module
import { setAuth } from "../../../auth/auth";

// Library
import bcrypt from "bcryptjs";

const Register = () => {
    const [value, setValue] = useState({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const { name: nameValue, username: usernameValue, password: passwordValue, confirmPassword: confirmPasswordValue } = value;

    const [isNameValid, setIsNameValid] = useState(true);

    const [isUsernameValid, setIsUsernameValid] = useState(true);

    const [isPasswordMatch, setIsPasswordMatch] = useState(true);

    const [showErrorPrompt, setShowErrorPrompt] = useState(false);

    const navigate = useNavigate();

    const { checkUsernameExist, isUsernameExist: isUsernameExistHooks } = useUsernameExist();

    const [isUsernameExist, setIsUsernameExist] = useState(isUsernameExistHooks);

    const { ADD_USER } = userMutation;

    const salt = bcrypt.genSaltSync(10);

    const [addUser] = useMutation(ADD_USER, {
        onCompleted: (data) => {
            const { username } = data.insert_users_one;
            setAuth(btoa(username));
            navigate("/");
        },
    });

    const checkNameValid = (name) => {
        if (/[^a-zA-Z\s]/.test(name)) {
            setIsNameValid(false);
        } else {
            setIsNameValid(true);
        }
    };

    const checkUsernameValid = (username) => {
        if (!/^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i.test(username)) {
            setIsUsernameValid(false);
        } else {
            setIsUsernameValid(true);
        }
    };

    const registerSuccess = () => {
        const encryptPassword = bcrypt.hashSync(passwordValue, salt);
        addUser({
            variables: {
                name: nameValue,
                username: usernameValue,
                password: encryptPassword,
            },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNameValid && isUsernameValid && isPasswordMatch) {
            checkUsernameExist(usernameValue);
        } else {
            setShowErrorPrompt(true);
        }
    };

    useEffect(() => {
        if (isUsernameExistHooks) {
            setIsUsernameExist(true);
        } else {
            if (
                isNameValid &&
                isUsernameValid &&
                isPasswordMatch &&
                nameValue !== "" &&
                usernameValue !== "" &&
                passwordValue !== "" &&
                confirmPasswordValue !== ""
            ) {
                registerSuccess();
            }
        }
    }, [isUsernameExistHooks]);

    useEffect(() => {
        if (nameValue !== "") {
            checkNameValid(nameValue);
        }
    }, [nameValue]);

    useEffect(() => {
        if (usernameValue.length > 18 || usernameValue.length < 5) {
            setIsUsernameValid(false);
        } else {
            checkUsernameValid(usernameValue);
        }
    }, [usernameValue]);

    useEffect(() => {
        if (confirmPasswordValue !== passwordValue) {
            setIsPasswordMatch(false);
        } else {
            setIsPasswordMatch(true);
        }
    }, [passwordValue, confirmPasswordValue]);

    useEffect(() => {
        if (showErrorPrompt) {
            setTimeout(() => {
                setShowErrorPrompt(false);
            }, 1500);
        }
    }, [showErrorPrompt]);

    useEffect(() => {
        if (isUsernameExist) {
            setTimeout(() => {
                setIsUsernameExist(false);
            }, 2500);
        }
    }, [isUsernameExist]);

    return (
        <WrapperAuth>
            <Card>
                <Flex justifyContent="center" mb={2}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </Flex>
                <Box>
                    <hr />
                    <hr />
                </Box>
                <form className={styles.formWrapper} onSubmit={handleSubmit}>
                    <Box my={2}>
                        <label className={styles.label}>Nama</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={nameValue}
                            onChange={(e) => {
                                setValue({ ...value, name: e.target.value });
                            }}
                            required
                        />
                        {!isNameValid && nameValue.length > 0 && <ErrorMessage message="Nama tidak sesuai" />}
                    </Box>
                    <Box my={2}>
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            className={styles.input}
                            value={usernameValue}
                            onChange={(e) => {
                                setValue({ ...value, username: e.target.value });
                            }}
                            required
                        />
                        {usernameValue.length > 18 && <ErrorMessage message="Panjang username terdiri dari 5-18 karakter" />}
                        {usernameValue.length > 0 && usernameValue.length < 5 && <ErrorMessage message="Panjang username terdiri dari 5-18 karakter" />}
                        {usernameValue.length <= 18 && usernameValue.length >= 5 && !isUsernameValid && (
                            <ErrorMessage message="Username hanya terdiri dari karakter huruf dan angka" />
                        )}
                    </Box>
                    <Box my={2}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={passwordValue}
                            onChange={(e) => {
                                setValue({ ...value, password: e.target.value });
                            }}
                            required
                        />
                    </Box>
                    <Box my={2}>
                        <label className={styles.label}>Masukkan kembali password anda</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={confirmPasswordValue}
                            onChange={(e) => {
                                setValue({ ...value, confirmPassword: e.target.value });
                            }}
                            required
                        />
                        {passwordValue.length > 0 && confirmPasswordValue.length > 0 && confirmPasswordValue !== passwordValue && (
                            <ErrorMessage message="Password tidak sesuai" />
                        )}
                    </Box>
                    {showErrorPrompt && <ErrorMessageWithCard message="Masukkan data dengan benar !!!" />}
                    {isUsernameExist && <ErrorMessageWithCard message="Username sudah terdaftar" />}
                    <Button type="submit" w="100%" mt={2} bgColor="primary.index" color="white" _hover={{ bgColor: "primary.hover" }}>
                        Register
                    </Button>
                </form>
                <Text fontSize={13} color="gray.500">
                    Punya akun?{" "}
                    <Link to="/login" className={styles.link}>
                        Login
                    </Link>
                </Text>
            </Card>
        </WrapperAuth>
    );
};

export default Register;
