import React from "react";
import styles from "./style.module.css";
import { Box, Button, Flex } from "@chakra-ui/react";

const QuestionForm = React.memo(
    ({ userId, profilePicture, username, spaces, handleClick, spaceIdSelected, setSpaceIdSelected, questionValue, setQuestionValue }) => {
        return (
            <>
                <Box fontSize={13}>
                    <select name="space" value={spaceIdSelected} className={styles.dropdown} onChange={(e) => setSpaceIdSelected(e.target.value)}>
                        <option value="Publik" className={styles.dropdownItem}>
                            Publik
                        </option>
                        {spaces?.spaces.map((space, idx) => {
                            const { id, name } = space;
                            return (
                                <option key={id} value={id} className={styles.dropdownItem}>
                                    {name}
                                </option>
                            );
                        })}
                    </select>
                </Box>
                <Flex alignItems="center" my={2}>
                    <Box>
                        <img src={profilePicture} width={36} alt={username} style={{ borderRadius: "50%" }} />
                    </Box>
                    <Box width="100%" ml={1}>
                        <input
                            className={styles.inputQuestion}
                            value={questionValue}
                            placeholder="Apa yang ingin Anda tanyakan?"
                            onChange={(e) => setQuestionValue(e.target.value)}
                            required
                        />
                    </Box>
                </Flex>
                <Flex justifyContent="flex-end">
                    <Button
                        borderRadius={50}
                        fontSize={13}
                        bgColor="primary.index"
                        color="white"
                        padding={2}
                        display="inline-block"
                        h="auto"
                        onClick={() => {
                            handleClick(questionValue, parseInt(spaceIdSelected), userId);
                        }}
                        _hover={{ bgColor: "primary.hover" }}
                    >
                        Tambah Pertanyaan
                    </Button>
                </Flex>
            </>
        );
    }
);

export default QuestionForm;
