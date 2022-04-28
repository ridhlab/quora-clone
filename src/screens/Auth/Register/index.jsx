import styles from "../style.module.css";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Card from "../../../Components/Card";
import Logo from "../../../Components/Logo";
import WrapperAuth from "../../../Components/WrapperAuth";

const Register = () => {
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
                        <label className={styles.label}>Nama</label>
                        <input type="text" className={styles.input} />
                    </Box>
                    <Box my={2}>
                        <label className={styles.label}>Username</label>
                        <input type="text" className={styles.input} />
                    </Box>
                    <Box my={2}>
                        <label className={styles.label}>Password</label>
                        <input type="password" className={styles.input} />
                    </Box>
                    <Button w="100%" mt={2} bgColor="primary.index" color="white" _hover={{ bgColor: "primary.hover" }}>
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
