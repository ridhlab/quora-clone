import styles from "./style.module.css";
import { ModalBody, ModalOverlay, ModalContent, ModalHeader, Flex, Button, Box } from "@chakra-ui/react";
import React from "react";

const ModalAnswer = React.memo(({ question, handleClickCloseAnswer, handleClickAnswer, setValueAnswer }) => {
    return (
        <>
            <ModalOverlay />
            <ModalContent p={4}>
                <ModalHeader>{question}</ModalHeader>
                <ModalBody>
                    <Box contentEditable className={styles.answerInput} onInput={(e) => setValueAnswer(e.currentTarget.textContent)}></Box>
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
                            onClick={() => handleClickAnswer()}
                        >
                            Jawab
                        </Button>
                        <Button display="inline-block" h="auto" borderRadius={50} fontSize={13} mx={2} px={8} py={3} onClick={() => handleClickCloseAnswer()}>
                            Cancel
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </>
    );
});

export default ModalAnswer;
