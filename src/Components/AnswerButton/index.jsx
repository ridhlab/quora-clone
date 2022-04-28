import { Button, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

const AnswerButton = () => {
    return (
        <Button
            display="flex"
            alignItems="center"
            px={3}
            borderRadius={50}
            bgColor="white"
            _hover={{ bgColor: "#F8F8F8", color: "primary.index" }}
            _active={{ bgColor: "gray.100" }}
        >
            <BiEditAlt />
            <Text fontSize={13}>Jawab</Text>
        </Button>
    );
};

export default AnswerButton;
