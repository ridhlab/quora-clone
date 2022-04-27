import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import questionQuery from "../../../../GraphQl/question/query";
import Question from "../../../../Components/Question";
import LineSeparator from "../../../../Components/LineSeparator";

const SpaceQuestions = () => {
    const { spaceId } = useParams();

    const { GET_QUESTIONS_BY_SPACE_ID } = questionQuery;

    const [getQuestionsBySpaceId, { data: questions, loading, error }] = useLazyQuery(GET_QUESTIONS_BY_SPACE_ID);

    useEffect(() => {
        getQuestionsBySpaceId({
            variables: {
                space_id: spaceId,
            },
        });
    }, []);

    useEffect(() => {
        console.log(questions, loading, error);
    }, [questions, loading, error]);

    return (
        <Box>
            {questions?.questions.map((question, idx) => {
                const { id, answers } = question;
                return (
                    <React.Fragment key={id}>
                        <Box my={4}>
                            <Question questionId={id} question={question.question} answerCount={answers.length} />
                        </Box>
                        {idx !== questions.questions.length - 1 && <LineSeparator />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default SpaceQuestions;
