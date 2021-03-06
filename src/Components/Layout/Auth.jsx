import { Box } from "@chakra-ui/react";

const LayoutAuth = ({ children }) => {
    return (
        <Box maxW={360} margin="auto" h="100vh" display="flex" alignItems="center">
            <Box w="100%">{children}</Box>
        </Box>
    );
};

export default LayoutAuth;
