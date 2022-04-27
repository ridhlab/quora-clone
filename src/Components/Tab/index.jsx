import { Box, Text } from "@chakra-ui/react";

const Tab = ({ tabActive, tabName, handleClickTab, text }) => {
    return (
        <Box
            _hover={{ cursor: "pointer", bgColor: tabActive === tabName ? "gray.100" : "gray.50" }}
            bgColor={tabActive === tabName ? "gray.50" : "white"}
            onClick={() => handleClickTab(tabName)}
        >
            <Text px={4} py={2} fontSize={13} color={tabActive === tabName ? "primary.index" : "gray.500"}>
                {text}
            </Text>
            <Box height={1} bgColor={tabActive === tabName ? "primary.index" : ""} />
        </Box>
    );
};

export default Tab;
