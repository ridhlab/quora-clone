import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

// React router
import { useParams } from "react-router-dom";

// Components
import Question from "../../../../Components/Question";
import LineSeparator from "../../../../Components/LineSeparator";
import Loading from "../../../../Components/Loading";

// GraphQL
import { useQuery } from "@apollo/client";
import questionQuery from "../../../../GraphQL/question/query";

const SpaceQuestions = () => {
    const { spaceId } = useParams();

    const { GET_QUESTIONS_BY_SPACE_ID } = questionQuery;

    const { data: questions, loading } = useQuery(GET_QUESTIONS_BY_SPACE_ID, {
        variables: {
            space_id: spaceId,
        },
    });

    if (typeof questions !== "object" && loading) {
        return (
            <Box>
                <Loading />
            </Box>
        );
    }

    return (
        <Box>
            {questions?.questions.length === 0 && (
                <Text fontSize={13} textAlign="center" my={4}>
                    Belum ada pertanyaan
                </Text>
            )}
            {questions?.questions.map((question, idx) => {
                const { id, answers, space_id } = question;
                return (
                    <React.Fragment key={id}>
                        <Box my={4}>
                            <Question questionId={id} question={question.question} answerCount={answers.length} spaceId={space_id} />
                        </Box>
                        {idx !== questions.questions.length - 1 && <LineSeparator />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default SpaceQuestions;
