import React from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LoginButton = React.memo(() => {
    return (
        <Link to="/login">
            <Button
                px={8}
                border="0"
                borderRadius={50}
                bgColor="primary.index"
                color="white"
                _hover={{ bgColor: "primary.hover" }}
                _active={{ bgColor: "primary.index" }}
            >
                Login
            </Button>
        </Link>
    );
});

export default LoginButton;
