import { Text } from "@chakra-ui/react";

import WrapperBtnWithIcon from "./Wrapper";

const ButtonWithIcon = ({ icon, text }) => {
    return (
        <WrapperBtnWithIcon>
            {icon}
            <Text fontSize={13}>{text}</Text>
        </WrapperBtnWithIcon>
    );
};

export default ButtonWithIcon;
