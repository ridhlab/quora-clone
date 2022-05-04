import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import ButtonWithIcon from "../ButtonWithIcon";

const Question = ({ answerCount, questionId, question }) => {
    return (
        <>
            <Text fontWeight={500}>
                <Link to={`/question/${questionId}`} className="link-underline">
                    {question}
                </Link>
            </Text>
            <Text fontSize={13} color="gray.500" my={2}>
                {answerCount} jawaban
            </Text>
            <Flex>
                <ButtonWithIcon icon={<BiEdit />} text="Jawab" />
            </Flex>
        </>
    );
};

export default Question;
