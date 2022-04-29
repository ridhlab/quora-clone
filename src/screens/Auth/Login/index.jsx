import styles from "../style.module.css";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Card from "../../../Components/Card";
import Logo from "../../../Components/Logo";
import { Link, useNavigate } from "react-router-dom";
import WrapperAuth from "../../../Components/WrapperAuth";
import bcrypt from "bcryptjs";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import userQuery from "../../../GraphQL/user/query";
import { useLazyQuery } from "@apollo/client";
import { ErrorMessageWithCard } from "../../../Components/AuthErrorMessage";
import { setAuth } from "../../../auth/auth";

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

    const [getUserForAuth, { data: users, loading, error }] = useLazyQuery(GET_USER_FOR_AUTH);

    const checkisPasswordExact = async () => {
        const isPasswordExact = await bcrypt.compare(value.password, users?.users[0].password);
        return isPasswordExact;
    };

    const checkAuthValid = async () => {
        if (users.users.length === 1) {
            const isPasswordExact = await checkisPasswordExact();
            if (isPasswordExact) {
                navigate("/", { state: { username: users.users[0].username } });
                setAuth(bcrypt.hashSync(users.users[0].username, bcrypt.genSaltSync(10)));
            } else {
                setIsPasswordValid(false);
            }
        } else {
            if (users.users.length === 0) {
                setIsUsernameExist(false);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("kesini");
        console.log(users);
        if (value.username === users?.users[0]?.username) {
            checkAuthValid();
        }
        getUserForAuth({
            variables: {
                username: value.username,
            },
        });
    };

    useEffect(() => {
        if (typeof users !== "undefined") {
            checkAuthValid();
        }
    }, [users]);

    useEffect(() => {
        if (!isUsernameExist) {
            setTimeout(() => {
                setIsUsernameExist(true);
            }, 1500);
        }
    }, [isUsernameExist, isPasswordValid]);

    useEffect(() => {
        if (!isPasswordValid) {
            setTimeout(() => {
                setIsPasswordValid(true);
            }, 1500);
        }
    }, [isPasswordValid]);

    useEffect(() => {
        console.log(users, loading, error);
    }, [users, loading, error]);

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
