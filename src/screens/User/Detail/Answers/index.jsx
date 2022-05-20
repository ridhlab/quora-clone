import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

// React Router
import { useParams } from "react-router-dom";

// Components
import Answer from "../../../../Components/Answer";
import LineSeparator from "../../../../Components/LineSeparator";
import Loading from "../../../../Components/Loading";

// GraphQL
import { useLazyQuery } from "@apollo/client";
import answerQuery from "../../../../GraphQL/answer/query";

const UserAnswers = () => {
    const { username } = useParams();

    const { GET_ANSWERS_BY_USERNAME } = answerQuery;

    const [getAnswersByUsername, { data: answers, loading }] = useLazyQuery(GET_ANSWERS_BY_USERNAME);

    useEffect(() => {
        getAnswersByUsername({
            variables: {
                username,
            },
        });
    }, [username]);

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
                <Box py={4}>
                    <Text fontSize={13} textAlign="center">
                        Belum ada jawaban
                    </Text>
                </Box>
            )}
            {answers?.answers.map((answer, idx) => {
                const { id: answerId } = answer;
                const { id: questionId, question } = answer.question;
                const { id: userId, name, username, profile_picture } = answer.user;
                return (
                    <React.Fragment key={answerId}>
                        <Box my={4}>
                            <Answer
                                answerId={answerId}
                                userId={userId}
                                key={answerId}
                                name={name}
                                username={username}
                                questionId={questionId}
                                question={question}
                                answer={answer.answer}
                                profilePicture={profile_picture}
                                showQuestion={true}
                                canClickLinkProfile={false}
                            />
                        </Box>
                        {idx !== answers.answers.length - 1 && <LineSeparator />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default UserAnswers;
