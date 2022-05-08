import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import Question from "../../Components/Question";
import questionQuery from "../../GraphQL/question/query";
import { useLazyQuery } from "@apollo/client";

const QuestionScreen = () => {
    const { GET_QUESTIONS } = questionQuery;

    const [getQuestions, { data, loading, error }] = useLazyQuery(GET_QUESTIONS);

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Layout>
            <Box maxW={500} margin="auto">
                {data?.questions.map((question, idx) => {
                    console.log(question);
                    const { answers, id, space_id } = question;
                    return (
                        <Card key={id}>
                            <Question questionId={id} question={question.question} answerCount={answers.length} spaceId={space_id} answers={answers} />
                        </Card>
                    );
                })}
            </Box>
        </Layout>
    );
};

export default QuestionScreen;
