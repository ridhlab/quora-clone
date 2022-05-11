import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

// Components
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import Question from "../../Components/Question";

// GraphQL
import questionQuery from "../../GraphQL/question/query";
import { useLazyQuery } from "@apollo/client";

const QuestionScreen = () => {
    const { GET_QUESTIONS } = questionQuery;

    const [getQuestions, { data }] = useLazyQuery(GET_QUESTIONS);

    useEffect(() => {
        getQuestions();
    }, []);

    return (
        <Layout>
            <Box maxW={500} margin="auto">
                {data?.questions.map((question, idx) => {
                    const { answers, id, space_id, user_id } = question;
                    return (
                        <Card key={id}>
                            <Question
                                questionId={id}
                                question={question.question}
                                answerCount={answers.length}
                                spaceId={space_id}
                                answers={answers}
                                userId={user_id}
                            />
                        </Card>
                    );
                })}
            </Box>
        </Layout>
    );
};

export default QuestionScreen;
