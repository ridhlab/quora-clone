import React from "react";
import { Box, Container } from "@chakra-ui/react";

// Components
import Navbar from "../Navbar";

const Layout = ({ children }) => {
    return (
        <Box>
            <Navbar />
            <Container maxW={1000} py={4}>
                {children}
            </Container>
        </Box>
    );
};

export default Layout;
