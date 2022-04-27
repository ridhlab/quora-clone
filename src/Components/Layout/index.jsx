import { Box, Container } from "@chakra-ui/react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Layout = ({ children }) => {
    return (
        <Box>
            <Navbar />
            <Container maxW={1000} py={4}>
                {children}
            </Container>
            <Footer />
        </Box>
    );
};

export default Layout;
