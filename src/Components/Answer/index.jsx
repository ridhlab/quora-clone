import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Downvote from "../Icon/Downvote";
import Upvote from "../Icon/Upvote";
import ProfileName from "../ProfileName";

const Answer = ({ questionId, profilePicture, username, name, question, answer, upvoteCount, downvoteCount, showQuestion, canClickLinkProfile }) => {
    const [isTextOverflow, setIsTextOverflow] = useState(true);

    return (
        <>
            <Flex>
                {canClickLinkProfile ? (
                    <Link to={`/user/${username}/answers`} className="link-underline">
                        <ProfileName profilePicture={profilePicture} name={name} username={username} />
                    </Link>
                ) : (
                    <ProfileName profilePicture={profilePicture} name={name} username={username} />
                )}
            </Flex>
            <Box my={2}>
                {showQuestion && (
                    <Heading as="h6" fontSize={20} my={2}>
                        <Link to={`/question/${questionId}`} className="link-underline">
                            {question}
                        </Link>
                    </Heading>
                )}
                <Box height={isTextOverflow ? 76 : null} overflow={isTextOverflow ? "hidden" : ""} position="relative">
                    <Text display="inline-block">{answer}</Text>
                    {isTextOverflow && (
                        <Box
                            as="span"
                            position="absolute"
                            right={0}
                            top="48px"
                            color="primary.index"
                            bgColor="whiteAlpha.800"
                            px={2}
                            _hover={{ color: "primary.hover", cursor: "pointer" }}
                            onClick={() => setIsTextOverflow(false)}
                        >
                            (lanjut)
                        </Box>
                    )}
                </Box>
            </Box>
            <Flex>
                <Flex p={2} bgColor="#F8F8F8" borderRadius={50}>
                    <Flex mx={2} alignItems="center">
                        <Upvote color="#D6D6D6" />
                        <Text>{upvoteCount}</Text>
                    </Flex>
                    <Box width={0.5} bgColor="#D6D6D6" />
                    <Flex mx={2} alignItems="center">
                        <Downvote color="#D6D6D6" />
                        <Text>{downvoteCount}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default Answer;
