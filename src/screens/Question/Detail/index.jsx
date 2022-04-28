import React, { useEffect } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Answer from "../../../Components/Answer";
import AnswerButton from "../../../Components/AnswerButton";
import Card from "../../../Components/Card";
import Layout from "../../../Components/Layout";

import { useLazyQuery } from "@apollo/client";
import answerQuery from "../../../GraphQL/answer/query";
import questionQuery from "../../../GraphQL/question/query";
import LineSeparator from "../../../Components/LineSeparator";

const QuestionDetail = () => {
    const { questionId } = useParams();

    const { GET_ANSWERS_BY_QUESTION_ID } = answerQuery;

    const { GET_QUESTION_BY_ID } = questionQuery;

    const [getAnswersByQuestionId, { data: answers, loading: loadingAnswers, error: errorAnswers }] = useLazyQuery(GET_ANSWERS_BY_QUESTION_ID);

    const [getQuestionById, { data: question, loading: loadingQuestion, error: errorQuestion }] = useLazyQuery(GET_QUESTION_BY_ID);

    useEffect(() => {
        getAnswersByQuestionId({
            variables: {
                question_id: questionId,
            },
        });
        getQuestionById({
            variables: {
                question_id: questionId,
            },
        });
    }, []);

    return (
        <Layout>
            <Box maxW={500} margin="auto">
                <Card>
                    <Heading as="h6" fontSize={20}>
                        {question?.questions_by_pk.question}
                    </Heading>
                    {!loadingQuestion && typeof question !== "undefined" && (
                        <>
                            <Flex my={2}>
                                <AnswerButton />
                            </Flex>
                            <hr />
                            <hr />
                        </>
                    )}
                    {answers?.answers.map((answer, idx) => {
                        const { name, username, profile_picture } = answer.user;
                        const { upvote_count, downvote_count } = answer;
                        return (
                            <React.Fragment key={answer.id}>
                                <Box my={4}>
                                    <Answer
                                        answer={answer.answer}
                                        name={name}
                                        username={username}
                                        profilePicture={profile_picture}
                                        upvoteCount={upvote_count}
                                        downvoteCount={downvote_count}
                                        showQuestion={false}
                                        canClickLinkProfile={true}
                                    />
                                </Box>
                                {idx !== answers.answers.length - 1 && <LineSeparator />}
                            </React.Fragment>
                        );
                    })}
                    {answers?.answers.length === 0 && (
                        <Text textAlign="center" color="gray.500" fontSize={13} my={2}>
                            Belum ada jawaban
                        </Text>
                    )}
                </Card>
            </Box>
        </Layout>
    );
};

export default QuestionDetail;
