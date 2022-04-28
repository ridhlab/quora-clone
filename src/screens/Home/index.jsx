import { useLazyQuery } from "@apollo/client";
import { Box, Container, Flex, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Answer from "../../Components/Answer";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";

import answerQuery from "../../GraphQL/answer/query";
import questionQuery from "../../GraphQL/question/query";
import spaceQuery from "../../GraphQL/space/query";

const Home = () => {
    const { GET_ANSWERS } = answerQuery;
    const { GET_QUESTIONS } = questionQuery;
    const { GET_SPACES } = spaceQuery;

    const [getAnswers, { data: answers, error: errorAnswers, loading: loadingAnswers }] = useLazyQuery(GET_ANSWERS);
    const [getQuestions, { data: questions, error: errorQuestions, loading: loadingQuestions }] = useLazyQuery(GET_QUESTIONS);
    const [getSpaces, { data: spaces, error: errorSpaces, loading: loadingSpaces }] = useLazyQuery(GET_SPACES);

    useEffect(() => {
        getAnswers();
        getQuestions();
        getSpaces();
    }, []);

    useEffect(() => {
        console.log(answers);
    }, [answers]);

    useEffect(() => {
        console.log(questions);
    }, [questions]);

    useEffect(() => {
        console.log(spaces);
    }, [spaces]);

    return (
        <Layout>
            <Flex justifyContent={{ base: "center", lg: "space-between" }}>
                <Box display={{ base: "none", lg: "block" }}>
                    {spaces?.spaces.length > 1 && (
                        <Box my={4}>
                            <Heading as="h6" fontSize={16}>
                                Daftar Ruang
                            </Heading>
                            <UnorderedList mx={0} my={2}>
                                {spaces?.spaces.map((space, idx) => {
                                    const { id, name, space_picture } = space;
                                    return (
                                        <Flex key={id}>
                                            <Link to={`/space/${id}/answers`} className="link-underline">
                                                <ListItem key={space.id} listStyleType="none" display="flex" alignItems="center">
                                                    <Box>
                                                        <img src={space_picture} width={24} alt={space} />
                                                    </Box>
                                                    <Text fontSize={13} mx={2}>
                                                        {name}
                                                    </Text>
                                                </ListItem>
                                            </Link>
                                        </Flex>
                                    );
                                })}
                            </UnorderedList>
                        </Box>
                    )}
                </Box>
                <Box maxWidth={500}>
                    {answers?.answers.map((answer, idx) => {
                        const { upvote_count, downvote_count } = answer;
                        const { profile_picture, username, name } = answer.user;
                        const { question, id: questionId } = answer.question;
                        return (
                            <Card key={answer.id}>
                                <Answer
                                    questionId={questionId}
                                    profilePicture={profile_picture}
                                    username={username}
                                    name={name}
                                    question={question}
                                    answer={answer.answer}
                                    upvoteCount={upvote_count}
                                    downvoteCount={downvote_count}
                                    showQuestion={true}
                                    canClickLinkProfile={true}
                                />
                            </Card>
                        );
                    })}
                </Box>
                <Box maxWidth={250} display={{ base: "none", lg: "block" }}>
                    {questions?.questions.length > 1 && (
                        <Box my={4}>
                            <Heading as="h6" fontSize={16}>
                                Daftar Pertanyaan
                            </Heading>
                            <UnorderedList m={0}>
                                {questions?.questions.map((question, idx) => {
                                    return (
                                        <ListItem key={question.id} listStyleType="none" my={2}>
                                            <Text fontSize={13}>
                                                <Link to={`/question/${question.id}`} className="link-underline">
                                                    {question.question}
                                                </Link>
                                            </Text>
                                        </ListItem>
                                    );
                                })}
                            </UnorderedList>
                        </Box>
                    )}
                </Box>
            </Flex>
        </Layout>
    );
};

export default Home;
