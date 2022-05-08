import { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";
import { Box, Button, Flex, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Downvote from "../Icon/Downvote";
import Upvote from "../Icon/Upvote";
import ProfileName from "../ProfileName";
import answerMutation from "../../GraphQL/answer/mutation";
import answerQuery from "../../GraphQL/answer/query";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Answer = ({
    answerId,
    questionId,
    profilePicture,
    username,
    name,
    question,
    answer,
    upvoteCount,
    downvoteCount,
    showQuestion,
    canClickLinkProfile,
    userId,
}) => {
    const [isTextOverflow, setIsTextOverflow] = useState(true);

    const [isOptClick, setIsOptClick] = useState(false);

    const [valueAnswerEdit, setValueAnswerEdit] = useState(question);

    const { username: usernameStore, userId: userIdStore } = useSelector((state) => state.authReducer);

    const { EDIT_ANSWER_BY_ID, DELETE_ANSWER } = answerMutation;

    const { GET_ANSWERS_BY_QUESTION_ID, GET_ASNWER_BY_ANSWER_ID_AND_USER_ID } = answerQuery;

    const [editAnswerById] = useMutation(EDIT_ANSWER_BY_ID, {
        onCompleted: (data) => {
            onCloseEditQuestion();
            Swal.fire({
                icon: "success",
                title: "Jawaban berhasil diupdate",
                showConfirmButton: false,
                timer: 2500,
            });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [deleteAnswer] = useMutation(DELETE_ANSWER, {
        onCompleted: (data) => {
            Swal.fire({
                icon: "success",
                title: "Jawaban berhasil dihapus",
                showConfirmButton: false,
                timer: 2500,
            });
            setIsOptClick(false);
        },
        refetchQueries: [GET_ANSWERS_BY_QUESTION_ID, "getAnswersByQuestionId"],
    });

    const { isOpen: isOpenEditQuestion, onOpen: onOpenEditQuestion, onClose: onCloseEditQuestion } = useDisclosure();

    const handleClickEdit = () => {
        onOpenEditQuestion();
        setIsOptClick(false);
    };

    const handleSubmitEditAnswer = (valueAns) => {
        console.log(valueAns);
        editAnswerById({
            variables: {
                answer_id: answerId,
                answer: valueAns,
            },
        });
    };

    const handleClickDelete = (_ansId) => {
        console.log(_ansId);
        deleteAnswer({
            variables: {
                answer_id: _ansId,
            },
        });
    };

    console.log(valueAnswerEdit);

    console.log(answerId, userId);

    // console.log(inputEditAns);

    return (
        <>
            <Flex>
                {canClickLinkProfile ? (
                    <Link to={`/user/${username}/answers`} className="link-underline">
                        <ProfileName profilePicture={profilePicture} name={name} username={username} />
                    </Link>
                ) : (
                    <ProfileName profilePicture={profilePicture} name={name} username={username} />
                )}
            </Flex>
            <Box my={2}>
                {showQuestion && (
                    <Heading as="h6" fontSize={20} my={2}>
                        <Link to={`/question/${questionId}`} className="link-underline">
                            {question}
                        </Link>
                    </Heading>
                )}
                <Box height={isTextOverflow ? 76 : null} overflow={isTextOverflow ? "hidden" : ""} position="relative">
                    <Text display="inline-block">{answer}</Text>
                    {isTextOverflow && (
                        <Box
                            as="span"
                            position="absolute"
                            right={0}
                            top="48px"
                            color="primary.index"
                            bgColor="whiteAlpha.800"
                            px={2}
                            _hover={{ color: "primary.hover", cursor: "pointer" }}
                            onClick={() => setIsTextOverflow(false)}
                        >
                            (lanjut)
                        </Box>
                    )}
                </Box>
            </Box>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex py={0} bgColor="rgba(0, 0, 0, 0.04)" borderRadius={50}>
                    <Flex px={2} alignItems="center" _hover={{ bgColor: "blackAlpha.50", borderRadius: "50% 0 0 50%" }}>
                        <Upvote color="#D6D6D6" />
                        <Text>{upvoteCount}</Text>
                    </Flex>
                    <Box width={0.5} bgColor="#D6D6D6" />
                    <Flex px={2} alignItems="center" _hover={{ bgColor: "blackAlpha.50", borderRadius: "50% 0 0 50%" }}>
                        <Downvote color="#D6D6D6" />
                        <Text>{downvoteCount}</Text>
                    </Flex>
                </Flex>
                {userIdStore === userId && (
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
                                <Box h=".5px" bgColor="gray.300" />
                                <Flex alignItems="center" _hover={{ color: "primary.index" }} onClick={() => handleClickDelete(answerId)}>
                                    <FiTrash2 size={10} />
                                    <Text fontSize={13}>Hapus</Text>
                                </Flex>
                            </Box>
                        )}
                    </Box>
                )}
            </Flex>
            <Modal isOpen={isOpenEditQuestion} onClose={onCloseEditQuestion} isCentered>
                <ModalOverlay />
                <ModalContent p={4}>
                    <ModalHeader>{question}</ModalHeader>
                    <ModalBody>
                        <Box
                            contentEditable
                            className={styles.answerInput}
                            onInput={(e) => setValueAnswerEdit(e.currentTarget.textContent)}
                            suppressContentEditableWarning
                        >
                            {answer}
                        </Box>
                        <Flex justifyContent="flex-end" mt={4}>
                            <Button
                                type="submit"
                                bgColor="primary.index"
                                display="inline-block"
                                h="auto"
                                color="white"
                                borderRadius={50}
                                fontSize={13}
                                mx={2}
                                px={8}
                                py={3}
                                _hover={{ bgColor: "primary.hover" }}
                                onClick={() => handleSubmitEditAnswer(valueAnswerEdit)}
                            >
                                Edit
                            </Button>
                            <Button display="inline-block" h="auto" borderRadius={50} fontSize={13} mx={2} px={8} py={3} onClick={() => onCloseEditQuestion()}>
                                Cancel
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Answer;
