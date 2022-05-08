import { useEffect, useState } from "react";
import { Box, Flex, Text, useDisclosure, Modal, ModalOverlay } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import ButtonWithIcon from "../ButtonWithIcon";
import questionMutation from "../../GraphQL/question/mutation";
import answerMutation from "../../GraphQL/answer/mutation";
import questionQuery from "../../GraphQL/question/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import ModalEdit from "../ModalEdit";
import ModalAnswer from "../ModalAnswer";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import answerQuery from "../../GraphQL/answer/query";

const Question = ({ answerCount, questionId, question, spaceId, answers }) => {
    const [isOptClick, setIsOptClick] = useState(false);

    const [canAnswer, setCanAnswer] = useState(true);

    const [valueEditQuestion, setValueEditQuestion] = useState(question);

    const [valueAnswer, setValueAnswer] = useState("");

    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const { isOpen: isOpenAnswer, onOpen: onOpenAnswer, onClose: onCloseAnswer } = useDisclosure();

    const { isLogin, username, userId } = useSelector((state) => state.authReducer);

    const navigate = useNavigate();

    const { EDIT_QUESTION } = questionMutation;

    const { ADD_ANSWER } = answerMutation;

    const { GET_QUESTIONS, GET_QUESTION_BY_ID } = questionQuery;

    const { GET_ASNWER_BY_QUESTION_ID_AND_USER_ID } = answerQuery;

    const [getAnswerByQuestionIdAndUserId] = useLazyQuery(GET_ASNWER_BY_QUESTION_ID_AND_USER_ID, {
        onCompleted: (data) => {
            if (data.answers.length !== 0) {
                setCanAnswer(false);
            }
            console.log(data);
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
        refetchQueries: [
            [GET_QUESTIONS, "getQuestions"],
            [GET_QUESTION_BY_ID, "getQuestionById"],
        ],
    });

    const [addAnswer] = useMutation(ADD_ANSWER, {
        onCompleted: () => {
            console.log("kesini");
            onCloseAnswer();
            new Promise((resolve, reject) => {
                resolve(
                    Swal.fire({
                        icon: "success",
                        title: "Jawaban berhasil ditambahkan",
                        showConfirmButton: false,
                        timer: 2500,
                    })
                );
            }).then(() => {
                navigate(`/question/${questionId}`);
            });
        },
    });

    const handleClickEdit = () => {
        onOpenEdit();
        setIsOptClick(false);
    };

    const handleClickCloseEdit = () => {
        onCloseEdit();
        setValueEditQuestion(question);
    };

    const handleClickCloseAnswer = () => {
        onCloseAnswer();
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

    const handleClickAnswer = () => {
        addAnswer({
            variables: {
                answer: valueAnswer,
                question_id: questionId,
                space_id: spaceId,
                user_id: userId,
            },
        });
    };

    useEffect(() => {
        if (isLogin) {
            getAnswerByQuestionIdAndUserId({
                variables: {
                    question_id: questionId,
                    user_id: userId,
                },
            });
        }
    }, []);
    console.log(spaceId, isLogin);

    // console.log(q)

    // console.log(isLogin, username, userId);

    return (
        <>
            <Box>
                <Text fontWeight={500}>
                    <Link to={`/question/${questionId}`} className="link-underline">
                        {question}
                    </Link>
                </Text>
            </Box>
            <Text fontSize={13} color="gray.500" my={2}>
                {answerCount} jawaban
            </Text>
            <Flex justifyContent="space-between" alignItems="center">
                {canAnswer && isLogin ? (
                    <Box onClick={() => onOpenAnswer()}>
                        <ButtonWithIcon icon={<BiEdit />} text="Jawab" />
                    </Box>
                ) : (
                    <Box>
                        <ButtonWithIcon icon={<BiEdit />} text="Jawab" canClick={false} />
                    </Box>
                )}

                <Box _hover={{ cursor: "pointer" }}>
                    <Box padding={1} position="relative" borderRadius={50} _hover={{ bgColor: "gray.100" }} onClick={() => setIsOptClick(!isOptClick)}>
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
            </Flex>
            <Modal isOpen={isOpenAnswer} onClose={onCloseAnswer} isCentered>
                <ModalAnswer
                    question={question}
                    handleClickCloseAnswer={handleClickCloseAnswer}
                    setValueAnswer={setValueAnswer}
                    handleClickAnswer={handleClickAnswer}
                />
            </Modal>
            <Modal isOpen={isOpenEdit} onClose={onCloseEdit} isCentered>
                <ModalEdit
                    valueEdit={valueEditQuestion}
                    setValueEdit={setValueEditQuestion}
                    handleSubmit={handleSubmitEdit}
                    handleClickClose={handleClickCloseEdit}
                    modalTitle="Edit Pertanyaan"
                />
            </Modal>
        </>
    );
};

export default Question;
