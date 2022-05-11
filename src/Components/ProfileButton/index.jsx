import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const ProfileButton = React.memo(({ profilePicture, name, username }) => {
    return (
        <Flex alignItems="center">
            <Box>
                <img src={profilePicture} width={25} alt={username} style={{ borderRadius: 50 }} />
            </Box>
            <Box ml={2}>
                <Text fontSize={14}>{name}</Text>
                <Text fontSize={12}>{username}</Text>
            </Box>
        </Flex>
    );
});

export default ProfileButton;
