import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";

// React router
import { Link } from "react-router-dom";

// Components
import Layout from "../../Components/Layout";
import Answer from "../../Components/Answer";
import Card from "../../Components/Card";
import QuestionForm from "../../Components/QuestionForm";

// Store
import { useSelector } from "react-redux";

// GraphQL
import { useLazyQuery, useMutation } from "@apollo/client";
import answerQuery from "../../GraphQL/answer/query";
import questionQuery from "../../GraphQL/question/query";
import spaceQuery from "../../GraphQL/space/query";
import userQuery from "../../GraphQL/user/query";
import questionMutation from "../../GraphQL/question/mutation";

// Library
import Swal from "sweetalert2";

const Home = () => {
    const [user, setUser] = useState({});

    const { isLogin, username: usernameStore, isLoadingAuth } = useSelector((state) => state.authReducer);

    const { GET_ANSWERS } = answerQuery;

    const { GET_QUESTIONS } = questionQuery;

    const { GET_SPACES } = spaceQuery;

    const { GET_USER_BY_USERNAME } = userQuery;

    const { ADD_QUESTION_WITHOUT_SPACE, ADD_QUESTION_WITH_SPACE } = questionMutation;

    const [getAnswers, { data: answers, refetch }] = useLazyQuery(GET_ANSWERS);

    const [getQuestions, { data: questions }] = useLazyQuery(GET_QUESTIONS);

    const [getSpaces, { data: spaces }] = useLazyQuery(GET_SPACES);

    const [getUserBysername, { data: users, loading: loadingUser }] = useLazyQuery(GET_USER_BY_USERNAME, {
        onCompleted: (data) => {
            setUser(data.users);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [addQuestionWithoutSpace] = useMutation(ADD_QUESTION_WITHOUT_SPACE, {
        onCompleted: (data) => {
            showAlertSuccessQuestion();
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [addQuestionWithSpace] = useMutation(ADD_QUESTION_WITH_SPACE, {
        onCompleted: (data) => {
            showAlertSuccessQuestion();
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const showAlertSuccessQuestion = () => {
        Swal.fire("Selamat", "Pertanyaan Berhasil Ditambahkan", "success");
    };

    const handleSubmitQuestion = (question, spaceId, userId) => {
        if (question !== "") {
            if (spaceId === "Publik") {
                addQuestionWithoutSpace({
                    variables: {
                        question,
                        user_id: userId,
                    },
                });
            } else {
                addQuestionWithSpace({
                    variables: {
                        question,
                        user_id: userId,
                        space_id: spaceId,
                    },
                });
            }
        }
    };

    useEffect(() => {
        if (usernameStore !== "") {
            getUserBysername({
                variables: {
                    username: usernameStore,
                },
            });
        }
    }, [usernameStore]);

    useEffect(() => {
        getAnswers();
        getQuestions();
        getSpaces();
    }, []);

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
                                                        <img src={space_picture} width={24} alt={space} style={{ borderRadius: 50 }} />
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
                    {user.length > 0 && isLogin && (
                        <Card>
                            <QuestionForm
                                userId={user[0].id}
                                username={user[0].username}
                                profilePicture={user[0].profile_picture}
                                spaces={spaces}
                                handleClick={handleSubmitQuestion}
                            />
                        </Card>
                    )}
                    {answers?.answers.map((answer, idx) => {
                        const { upvote_count, downvote_count, id } = answer;
                        const { profile_picture, username, name, id: userId } = answer.user;
                        const { question, id: questionId } = answer.question;
                        return (
                            <Card key={answer.id}>
                                <Answer
                                    answerId={id}
                                    userId={userId}
                                    questionId={questionId}
                                    profilePicture={profile_picture}
                                    username={username}
                                    name={name}
                                    question={question}
                                    answer={answer.answer}
                                    upvoteCount={upvote_count}
                                    downvoteCount={downvote_count}
                                    refetch={refetch}
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
