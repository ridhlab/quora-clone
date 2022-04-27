import { useEffect } from "react";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import questionQuery from "../../GraphQl/question/query";
import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import AnswerButton from "../../Components/AnswerButton";
import Question from "../../Components/Question";

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
                    const { answers, id } = question;
                    return (
                        <Card key={id}>
                            <Question questionId={id} question={question.question} answerCount={answers.length} />
                        </Card>
                    );
                })}
            </Box>
        </Layout>
    );
};

export default QuestionScreen;
