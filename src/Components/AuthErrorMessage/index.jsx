import { Box, Text } from "@chakra-ui/react";

const ErrorMessage = ({ message }) => {
    return (
        <Text color="gray.500" fontSize={11}>
            {message}
        </Text>
    );
};

const ErrorMessageWithCard = ({ message }) => {
    return (
        <Box bgColor="red.400" p={1} borderRadius={4}>
            <Text fontSize={13} color="white">
                {message}
            </Text>
        </Box>
    );
};

export { ErrorMessageWithCard, ErrorMessage };
