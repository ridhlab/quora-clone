import styles from "../style.module.css";
import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Card from "../../../Components/Card";
import Logo from "../../../Components/Logo";
import { Link } from "react-router-dom";
import WrapperAuth from "../../../Components/WrapperAuth";

const Login = () => {
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
                <form className={styles.formWrapper}>
                    <Box my={2}>
                        <label className={styles.label}>Username</label>
                        <input type="text" className={styles.input} />
                    </Box>
                    <Box my={2}>
                        <label className={styles.label}>Password</label>
                        <input type="password" className={styles.input} />
                    </Box>
                    <Button w="100%" mt={2} bgColor="primary.index" color="white" _hover={{ bgColor: "primary.hover" }}>
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
