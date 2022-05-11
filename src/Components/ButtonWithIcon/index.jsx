import React from "react";
import { Text } from "@chakra-ui/react";

// Components
import WrapperBtnWithIcon from "./Wrapper";

const ButtonWithIcon = React.memo(({ icon, text, canClick }) => {
    return (
        <WrapperBtnWithIcon canClick={canClick}>
            {icon}
            <Text fontSize={13}>{text}</Text>
        </WrapperBtnWithIcon>
    );
});

export default ButtonWithIcon;
