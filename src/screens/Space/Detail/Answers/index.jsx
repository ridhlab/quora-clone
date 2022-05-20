import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

// React router
import { useParams } from "react-router-dom";

// Components
import Answer from "../../../../Components/Answer";
import LineSeparator from "../../../../Components/LineSeparator";
import Loading from "../../../../Components/Loading";

// GraphQL
import { useQuery } from "@apollo/client";
import answerQuery from "../../../../GraphQL/answer/query";

const SpaceAnswers = () => {
    const { spaceId } = useParams();

    const { GET_ANSWERS_BY_SPACE_ID } = answerQuery;

    const { data: answers, loading } = useQuery(GET_ANSWERS_BY_SPACE_ID, {
        variables: {
            space_id: spaceId,
        },
    });

    if (typeof answers !== "object" && loading) {
        return (
            <Box>
                <Loading />
            </Box>
        );
    }

    return (
        <Box>
            {answers?.answers.length === 0 && (
                <Text fontSize={13} textAlign="center" my={4}>
                    Belum ada jawaban
                </Text>
            )}
            {answers?.answers.map((answer, idx) => {
                const { id } = answer;
                const { id: questionId, question } = answer.question;
                const { name, username, profile_picture } = answer.user;
                return (
                    <React.Fragment key={id}>
                        <Box my={4}>
                            <Answer
                                answerId={answer.id}
                                questionId={questionId}
                                name={name}
                                username={username}
                                profilePicture={profile_picture}
                                question={question}
                                answer={answer.answer}
                                showQuestion={true}
                                canClickLinkProfile={true}
                            />
                        </Box>
                        {idx !== answers.answers.length - 1 && <LineSeparator />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default SpaceAnswers;
