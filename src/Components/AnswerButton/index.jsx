import { Button, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

const AnswerButton = () => {
    return (
        <Button display="flex" alignItems="center" p={2} borderRadius={50} bgColor="white" _hover={{ bgColor: "#F8F8F8", color: "primary.index" }}>
            <BiEditAlt />
            <Text fontSize={13}>Jawab</Text>
        </Button>
    );
};

export default AnswerButton;
