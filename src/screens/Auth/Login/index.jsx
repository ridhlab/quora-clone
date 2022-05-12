import React, { useEffect, useState } from "react";
import styles from "../style.module.css";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Components
import Card from "../../../Components/Card";
import Logo from "../../../Components/Logo";
import WrapperAuth from "../../../Components/WrapperAuth";
import { ErrorMessageWithCard } from "../../../Components/AuthErrorMessage";

// Icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// GraphQL
import userQuery from "../../../GraphQL/user/query";
import { useLazyQuery } from "@apollo/client";

// Module
import { setAuth } from "../../../auth/auth";

// Library
import bcrypt from "bcryptjs";

const Login = () => {
    const [passVisibility, setPassVisibility] = useState(false);

    const [value, setValue] = useState({
        username: "",
        password: "",
    });

    const [isUsernameExist, setIsUsernameExist] = useState(true);

    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const navigate = useNavigate();

    const { GET_USER_FOR_AUTH } = userQuery;

    const [getUserForAuth, { data: users }] = useLazyQuery(GET_USER_FOR_AUTH, {
        onCompleted: (data) => {
            const { users: usersData } = data;
            checkAuthValid(usersData);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const checkisPasswordExact = async (passwInput, passwDb) => {
        const isPasswordExact = await bcrypt.compare(passwInput, passwDb);
        return isPasswordExact;
    };

    const checkAuthValid = async (data) => {
        if (data.length === 1) {
            const isPasswordExact = await checkisPasswordExact(value.password, data[0].password);
            if (isPasswordExact) {
                navigate("/");
                setAuth(btoa(data[0].username));
            } else {
                setIsPasswordValid(false);
            }
        } else {
            if (data.length === 0) {
                setIsUsernameExist(false);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.username === users?.users[0]?.username) {
            checkAuthValid(users.users);
        }
        getUserForAuth({
            variables: {
                username: value.username,
            },
        });
    };

    useEffect(() => {
        if (!isUsernameExist) {
            setTimeout(() => {
                setIsUsernameExist(true);
            }, 1500);
        }
    }, [isUsernameExist]);

    useEffect(() => {
        if (!isPasswordValid) {
            setTimeout(() => {
                setIsPasswordValid(true);
            }, 1500);
        }
    }, [isPasswordValid]);

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
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            className={styles.input}
                            autoComplete="off"
                            value={value.username}
                            onChange={(e) => setValue({ ...value, username: e.target.value })}
                            required
                        />
                    </Box>
                    <Box my={2}>
                        <label className={styles.label}>Password</label>
                        <Box position="relative">
                            <input
                                type={passVisibility ? "text" : "password"}
                                className={styles.input}
                                value={value.password}
                                onChange={(e) => setValue({ ...value, password: e.target.value })}
                                required
                            />
                            {passVisibility ? (
                                <AiFillEyeInvisible className={styles.eyeIcon} color="#AAA" onClick={() => setPassVisibility(false)} />
                            ) : (
                                <AiFillEye className={styles.eyeIcon} color="#DDD" onClick={() => setPassVisibility(true)} />
                            )}
                        </Box>
                    </Box>

                    {!isUsernameExist && <ErrorMessageWithCard message="Username yang anda masukkan tidak tersedia" />}

                    {!isPasswordValid && <ErrorMessageWithCard message="Password yang anda masukkan salah" />}

                    <Button type="submit" w="100%" mt={2} bgColor="primary.index" color="white" _hover={{ bgColor: "primary.hover" }}>
                        Login
                    </Button>
                </form>
                <Text fontSize={13} color="gray.500">
                    Belum punya akun?{" "}
                    <Link to="/register" className={styles.link}>
                        Daftar
                    </Link>
                </Text>
            </Card>
        </WrapperAuth>
    );
};

export default Login;
