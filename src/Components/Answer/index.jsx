import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Box, Button, Flex, Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

// React Router
import { Link } from "react-router-dom";

// Components
import ProfileName from "../ProfileName";

// Store
import { useSelector } from "react-redux";

// Icons
import { BsThreeDots } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Downvote from "../Icon/Downvote";
import Upvote from "../Icon/Upvote";

// GraphQL
import answerMutation from "../../GraphQL/answer/mutation";
import answerQuery from "../../GraphQL/answer/query";
import { upvoteQuery, downvoteQuery } from "../../GraphQL/upvote-downvote/query";
import { upvoteMutation, downvoteMutation } from "../../GraphQL/upvote-downvote/mutation";
import { useMutation, useQuery } from "@apollo/client";

// Library
import Swal from "sweetalert2";

const Answer = React.memo(({ answerId, questionId, profilePicture, username, name, question, answer, refetch, showQuestion, canClickLinkProfile, userId }) => {
    const [isTextOverflow, setIsTextOverflow] = useState(true);

    const [isOptClick, setIsOptClick] = useState(false);

    const [upvoteCount, setUpvoteCount] = useState("");

    const [downvoteCount, setDownvoteCount] = useState("");

    const [isUpvote, setIsUpvote] = useState(false);

    const [isDownvote, setIsDownvote] = useState(false);

    const [valueAnswerEdit, setValueAnswerEdit] = useState(question);

    const { isLogin, userId: userIdStore } = useSelector((state) => state.authReducer);

    const { EDIT_ANSWER_BY_ID, DELETE_ANSWER } = answerMutation;

    const { GET_ANSWERS_BY_QUESTION_ID } = answerQuery;

    const { GET_UPVOTE_BY_ANSWER_ID } = upvoteQuery;

    const { GET_DOWNVOTE_BY_ANSWER_ID } = downvoteQuery;

    const { ADD_UPVOTE, DELETE_UPVOTE } = upvoteMutation;

    const { ADD_DOWNVOTE, DELETE_DOWNVOTE } = downvoteMutation;

    useQuery(GET_UPVOTE_BY_ANSWER_ID, {
        variables: {
            answer_id: answerId,
        },
        onCompleted: (data) => {
            const { upvote } = data;
            if (upvote.length !== 0) {
                setUpvoteCount(upvote.length);
                if (typeof upvote.find((upvote) => upvote.user_id === userIdStore) !== "undefined") {
                    setIsUpvote(true);
                }
            } else {
                setUpvoteCount("");
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });

    useQuery(GET_DOWNVOTE_BY_ANSWER_ID, {
        variables: {
            answer_id: answerId,
        },
        onCompleted: (data) => {
            const { downvote } = data;
            if (downvote.length !== 0) {
                setDownvoteCount(downvote.length);
                if (typeof downvote.find((downvote) => downvote.user_id === userIdStore) !== "undefined") {
                    setIsDownvote(true);
                }
            } else {
                setDownvoteCount("");
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [addUpvote] = useMutation(ADD_UPVOTE, {
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_UPVOTE_BY_ANSWER_ID, "getUpvoteByAnswerId"],
    });

    const [deleteUpvote] = useMutation(DELETE_UPVOTE, {
        onCompleted: (data) => {
            setIsUpvote(false);
        },
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_UPVOTE_BY_ANSWER_ID, "getUpvoteByAnswerId"],
    });

    const [addDownvote] = useMutation(ADD_DOWNVOTE, {
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_DOWNVOTE_BY_ANSWER_ID, "getDownvoteByAnswerId"],
    });

    const [deleteDownvote] = useMutation(DELETE_DOWNVOTE, {
        onCompleted: (data) => {
            setIsDownvote(false);
        },
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_DOWNVOTE_BY_ANSWER_ID, "getDownvoteByAnswerId"],
    });

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
            refetch();
        },
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_ANSWERS_BY_QUESTION_ID, "getAnswersByQuestionId"],
    });

    const { isOpen: isOpenEditQuestion, onOpen: onOpenEditQuestion, onClose: onCloseEditQuestion } = useDisclosure();

    const handleClickEdit = () => {
        onOpenEditQuestion();
        setIsOptClick(false);
    };

    const handleSubmitEditAnswer = (_value, _ansId) => {
        editAnswerById({
            variables: {
                answer_id: _ansId,
                answer: _value,
            },
        });
    };

    const handleClickDelete = (_ansId) => {
        deleteAnswer({
            variables: {
                answer_id: _ansId,
            },
        });
    };

    const handleClickUpvote = (_ansId, _userId) => {
        addUpvote({
            variables: {
                answer_id: _ansId,
                user_id: _userId,
            },
        });
    };

    const handleClickUnupvote = (_ansId, _userId) => {
        deleteUpvote({
            variables: {
                answer_id: _ansId,
                user_id: _userId,
            },
        });
    };

    const handleClickDownvote = (_ansId, _userId) => {
        addDownvote({
            variables: {
                answer_id: _ansId,
                user_id: _userId,
            },
        });
    };

    const handleClickUndownvote = (_ansId, _userId) => {
        deleteDownvote({
            variables: {
                answer_id: _ansId,
                user_id: _userId,
            },
        });
    };

    useEffect(() => {
        if (!isLogin) {
            setIsUpvote(false);
            setIsDownvote(false);
        }
    }, [isLogin]);

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
                <Flex bgColor="rgba(0, 0, 0, 0.04)" borderRadius={50} fontSize={13}>
                    {isUpvote ? (
                        <Flex
                            p={2}
                            alignItems="center"
                            cursor={isLogin ? "pointer" : ""}
                            _hover={{ bgColor: isLogin ? "blackAlpha.50" : "", borderRadius: "50% 0 0 50%" }}
                            onClick={() => isLogin && handleClickUnupvote(answerId, userIdStore)}
                        >
                            <Upvote color="#2FD2DC" />
                            <Text>{upvoteCount}</Text>
                        </Flex>
                    ) : (
                        <Flex
                            p={2}
                            alignItems="center"
                            cursor={isLogin && !isDownvote ? "pointer" : "not-allowed"}
                            _hover={{ bgColor: isLogin && !isDownvote ? "blackAlpha.50" : "", borderRadius: "50% 0 0 50%" }}
                            onClick={() => isLogin && !isDownvote && handleClickUpvote(answerId, userIdStore)}
                        >
                            <Upvote color="#D6D6D6" />
                            <Text>{upvoteCount}</Text>
                        </Flex>
                    )}
                    <Box width={0.5} bgColor="#D6D6D6" />
                    {isDownvote ? (
                        <Flex
                            px={2}
                            alignItems="center"
                            cursor={isLogin ? "pointer" : ""}
                            _hover={{ bgColor: isLogin ? "blackAlpha.50" : "", borderRadius: "0 50% 50% 0" }}
                            onClick={() => isLogin && handleClickUndownvote(answerId, userIdStore)}
                        >
                            <Downvote color="#2FD2DC" />
                            <Text>{downvoteCount}</Text>
                        </Flex>
                    ) : (
                        <Flex
                            px={2}
                            alignItems="center"
                            cursor={isLogin && !isUpvote ? "pointer" : "not-allowed"}
                            _hover={{ bgColor: isLogin && !isUpvote ? "blackAlpha.50" : "", borderRadius: "0 50% 50% 0" }}
                            onClick={() => isLogin && !isUpvote && handleClickDownvote(answerId, userIdStore)}
                        >
                            <Downvote color="#D6D6D6" />
                            <Text>{downvoteCount}</Text>
                        </Flex>
                    )}
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
                                onClick={() => handleSubmitEditAnswer(valueAnswerEdit, answerId)}
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
});

export default Answer;
