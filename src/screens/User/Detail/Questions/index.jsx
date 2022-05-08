import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

import { useLazyQuery } from "@apollo/client";
import questionQuery from "../../../../GraphQL/question/query";
import Question from "../../../../Components/Question";
import LineSeparator from "../../../../Components/LineSeparator";

const UserQuestions = () => {
    const { username } = useParams();

    const { GET_QUESTIONS_BY_USERNAME } = questionQuery;

    const [getQuestionsByUsername, { data: questions, loading, error }] = useLazyQuery(GET_QUESTIONS_BY_USERNAME);

    useEffect(() => {
        getQuestionsByUsername({
            variables: {
                username,
            },
        });
    }, []);

    useEffect(() => {
        console.log(questions, loading, error);
    }, [questions, loading, error]);

    return (
        <Box>
            {questions?.questions.length === 0 && (
                <Box py={4}>
                    <Text fontSize={13} textAlign="center">
                        Belum ada pertanyaan
                    </Text>
                </Box>
            )}
            {questions?.questions.map((question, idx) => {
                const { answers, id, space_id } = question;
                return (
                    <React.Fragment key={id}>
                        <Box my={4}>
                            <Question questionId={id} answerCount={answers.length} question={question.question} spaceId={space_id} />
                        </Box>
                        {idx !== questions.questions.length - 1 && <LineSeparator />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default UserQuestions;
