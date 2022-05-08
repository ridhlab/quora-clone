import { Button } from "@chakra-ui/react";

const WrapperBtnWithIcon = ({ children, canClick }) => {
    return (
        <Button
            display="flex"
            alignItems="center"
            px={3}
            borderRadius={50}
            bgColor="white"
            _hover={{ bgColor: canClick && "#F8F8F8", color: canClick && "primary.index" }}
            _active={{ bgColor: canClick && "gray.100" }}
            cursor={!canClick && "not-allowed"}
            color={!canClick && "#D6D6D6"}
            _focus={{ border: !canClick ? 0 : "2px solid #2FD2DC" }}
        >
            {children}
        </Button>
    );
};

export default WrapperBtnWithIcon;

WrapperBtnWithIcon.defaultProps = {
    canClick: true,
};
