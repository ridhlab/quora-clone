import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Modal, Text, useDisclosure } from "@chakra-ui/react";

// React router
import { useNavigate, useParams } from "react-router-dom";

// Components
import Answer from "../../../Components/Answer";
import ButtonWithIcon from "../../../Components/ButtonWithIcon";
import Card from "../../../Components/Card";
import Layout from "../../../Components/Layout";
import LineSeparator from "../../../Components/LineSeparator";
import ModalEdit from "../../../Components/ModalEdit";
import ModalAnswer from "../../../Components/ModalAnswer";

// Icons
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";

// Store
import { useSelector } from "react-redux";

// GraphQL
import { useLazyQuery, useMutation } from "@apollo/client";
import answerQuery from "../../../GraphQL/answer/query";
import answerMutation from "../../../GraphQL/answer/mutation";
import questionQuery from "../../../GraphQL/question/query";
import questionMutation from "../../../GraphQL/question/mutation";

// Library
import Swal from "sweetalert2";

const QuestionDetail = () => {
    const { questionId } = useParams();

    const navigate = useNavigate();

    const [isOptClick, setIsOptClick] = useState(false);

    const [valueEditQuestion, setValueEditQuestion] = useState("");

    const [valueAnswer, setValueAnswer] = useState("");

    const { userId, isLogin } = useSelector((state) => state.authReducer);

    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

    const { isOpen: isOpenAnswer, onOpen: onOpenAnswer, onClose: onCloseAnswer } = useDisclosure();

    const { GET_ANSWERS_BY_QUESTION_ID } = answerQuery;

    const { GET_QUESTION_BY_ID, GET_QUESTIONS } = questionQuery;

    const { EDIT_QUESTION } = questionMutation;

    const { ADD_ANSWER } = answerMutation;

    const [getAnswersByQuestionId, { data: answers }] = useLazyQuery(GET_ANSWERS_BY_QUESTION_ID);

    const [getQuestionById, { data: question, loading: loadingQuestion }] = useLazyQuery(GET_QUESTION_BY_ID, {
        onCompleted: (data) => {
            setValueEditQuestion(data.questions_by_pk.question);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [editQuestion] = useMutation(EDIT_QUESTION, {
        onCompleted: () => {
            onCloseEdit();
            Swal.fire({
                icon: "success",
                title: "Pertanyaan berhasil diupdate",
                showConfirmButton: false,
                timer: 2500,
            });
        },
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [
            [GET_QUESTIONS, "getQuestions"],
            [GET_QUESTION_BY_ID, "getQuestionById"],
        ],
    });

    const [addAnswer] = useMutation(ADD_ANSWER, {
        onCompleted: () => {
            onCloseAnswer();
            Swal.fire({
                icon: "success",
                title: "Jawaban berhasil ditambahkan",
                showConfirmButton: false,
                timer: 2500,
            });
        },
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_ANSWERS_BY_QUESTION_ID, "getAnswersByQuestionId"],
    });

    const handleClickEdit = () => {
        onOpenEdit();
        setIsOptClick(false);
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        editQuestion({
            variables: {
                question: valueEditQuestion,
                question_id: questionId,
            },
        });
    };

    const handleClickCloseEdit = () => {
        onCloseEdit();
        setValueEditQuestion(question.questions_by_pk.question);
    };

    const handleClickCloseAnswer = () => {
        onCloseAnswer();
    };

    const handleClickAnswer = () => {
        if (valueAnswer !== "") {
            addAnswer({
                variables: {
                    answer: valueAnswer,
                    question_id: questionId,
                    space_id: question?.questions_by_pk.space_id,
                    user_id: userId,
                },
            });
        }
    };

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
                    <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
                        <ModalEdit
                            valueEdit={valueEditQuestion}
                            setValueEdit={setValueEditQuestion}
                            handleClickClose={handleClickCloseEdit}
                            handleSubmit={handleSubmitEdit}
                            modalTitle="Edit Pertanyaan"
                        />
                    </Modal>
                    {!loadingQuestion && typeof question !== "undefined" && (
                        <>
                            {isLogin ? (
                                <>
                                    <Flex my={2} alignItems="center" justifyContent="space-between">
                                        <Box onClick={() => onOpenAnswer()}>
                                            <ButtonWithIcon icon={<BiEdit />} text="Jawab" />
                                        </Box>
                                        {question?.questions_by_pk.user_id === userId && (
                                            <Box _hover={{ cursor: "pointer" }}>
                                                <Box
                                                    padding={1}
                                                    position="relative"
                                                    borderRadius={50}
                                                    _hover={{ bgColor: "gray.100" }}
                                                    onClick={() => setIsOptClick(!isOptClick)}
                                                >
                                                    <BsThreeDots />
                                                </Box>
                                                {isOptClick && (
                                                    <Box p={2} position="absolute" minW={100} bgColor="white" boxShadow="0px 1px 7px rgba(0, 0, 0, 0.17)">
                                                        <Flex alignItems="center" _hover={{ color: "primary.index" }} onClick={() => handleClickEdit()}>
                                                            <FiEdit2 size={10} />
                                                            <Text fontSize={13}>Edit</Text>
                                                        </Flex>
                                                    </Box>
                                                )}
                                            </Box>
                                        )}
                                    </Flex>
                                    <Modal isOpen={isOpenAnswer} onClose={onCloseAnswer} isCentered>
                                        <ModalAnswer
                                            question={question?.questions_by_pk.question}
                                            handleClickCloseAnswer={handleClickCloseAnswer}
                                            setValueAnswer={setValueAnswer}
                                            handleClickAnswer={handleClickAnswer}
                                        />
                                    </Modal>
                                </>
                            ) : (
                                <Box onClick={() => navigate("/login")} my={2}>
                                    <ButtonWithIcon text="Jawab" icon={<BiEdit />} />
                                </Box>
                            )}

                            <hr />
                            <hr />
                        </>
                    )}
                    {answers?.answers.map((answer, idx) => {
                        const { name, username, profile_picture, id: userId } = answer.user;
                        const { id: answerId } = answer;
                        return (
                            <React.Fragment key={answerId}>
                                <Box my={4}>
                                    <Answer
                                        answerId={answerId}
                                        userId={userId}
                                        answer={answer.answer}
                                        name={name}
                                        username={username}
                                        profilePicture={profile_picture}
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
