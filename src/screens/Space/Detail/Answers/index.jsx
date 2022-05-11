import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Answer from "../../../../Components/Answer";

import { useLazyQuery } from "@apollo/client";
import answerQuery from "../../../../GraphQL/answer/query";
import LineSeparator from "../../../../Components/LineSeparator";

const SpaceAnswers = () => {
    const { spaceId } = useParams();

    const { GET_ANSWERS_BY_SPACE_ID } = answerQuery;

    const [getAnswersBySpaceId, { data: answers, loading, error }] = useLazyQuery(GET_ANSWERS_BY_SPACE_ID);

    useEffect(() => {
        getAnswersBySpaceId({
            variables: {
                space_id: spaceId,
            },
        });
    }, []);

    return (
        <Box>
            {answers?.answers.length === 0 && (
                <Text fontSize={13} textAlign="center" my={4}>
                    Belum ada jawaban
                </Text>
            )}
            {answers?.answers.map((answer, idx) => {
                const { upvote_count, downvote_count, id } = answer;
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
                                upvoteCount={upvote_count}
                                downvoteCount={downvote_count}
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
