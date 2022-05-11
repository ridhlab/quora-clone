import React from "react";
import { Box } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";

const EditIcon = React.memo(({ onToggle, setIsEdit, isEdit }) => {
    return (
        <Box
            ml={2}
            cursor="pointer"
            onClick={() => {
                onToggle();
                setIsEdit(!isEdit);
            }}
        >
            <FiEdit2 />
        </Box>
    );
});

export default EditIcon;
