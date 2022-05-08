import { Text } from "@chakra-ui/react";

import WrapperBtnWithIcon from "./Wrapper";

const ButtonWithIcon = ({ icon, text, canClick }) => {
    return (
        <WrapperBtnWithIcon canClick={canClick}>
            {icon}
            <Text fontSize={13}>{text}</Text>
        </WrapperBtnWithIcon>
    );
};

export default ButtonWithIcon;
