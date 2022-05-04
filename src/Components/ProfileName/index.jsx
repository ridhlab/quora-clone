import { Box, Flex, Text } from "@chakra-ui/react";

const ProfileName = ({ profilePicture, username, name }) => {
    return (
        <Flex alignItems="center">
            <Box>
                <img width={25} src={profilePicture} alt={username} style={{ borderRadius: 50 }} />
            </Box>
            <Text fontSize={14} mx={2}>
                {name}
            </Text>
        </Flex>
    );
};

export default ProfileName;
