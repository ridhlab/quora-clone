import { Button } from "@chakra-ui/react";

const WrapperBtnWithIcon = ({ children }) => {
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
            {children}
        </Button>
    );
};

export default WrapperBtnWithIcon;
