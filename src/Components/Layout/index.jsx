import React, { useEffect } from "react";
import { Container } from "@chakra-ui/react";

// Components
import Navbar from "../Navbar";

// Hooks
import useAuth from "../../hooks/useAuth";

const Layout = ({ children }) => {
    const { checkTokenValid } = useAuth();

    const getLocalStorage = () => {
        if (localStorage.getItem("userToken")) {
            const lStorage = JSON.parse(localStorage.getItem("userToken"));
            const { token } = lStorage;
            return token;
        } else {
            return null;
        }
    };

    useEffect(() => {
        if (getLocalStorage() !== null) {
            checkTokenValid(getLocalStorage());
        }
    }, []);

    return (
        <>
            <Navbar />
            <Container maxW={1000} py={4}>
                {children}
            </Container>
        </>
    );
};

export default Layout;
