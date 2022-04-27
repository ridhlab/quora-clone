import { Box } from "@chakra-ui/react";

const Card = ({ children }) => {
    return (
        <Box p={4} bgColor="white" borderRadius={4} my={4}>
            {children}
        </Box>
    );
};

export default Card;
