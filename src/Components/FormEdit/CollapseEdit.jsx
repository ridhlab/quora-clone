import React from "react";
import { Button, Collapse } from "@chakra-ui/react";
import styles from "./style.module.css";

const CollapseEdit = React.memo(({ isOpen, onToggle, setIsEdit, isEdit, valueEdit, setValueEdit, editName, handleEdit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit(valueEdit, editName);
    };

    return (
        <Collapse mb={4} in={isOpen} animateOpacity>
            <form onSubmit={handleSubmit}>
                <input type="text" className={styles.inputEdit} value={valueEdit} onChange={(e) => setValueEdit(e.target.value)} required />
                <Button
                    type="submit"
                    display="inline-block"
                    h="auto"
                    p={1}
                    mx={1}
                    bgColor="primary.index"
                    fontSize={13}
                    color="white"
                    _hover={{ bgColor: "primary.hover" }}
                >
                    Edit
                </Button>
                <Button
                    display="inline-block"
                    h="auto"
                    p={1}
                    mx={1}
                    bgColor="gray.300"
                    fontSize={13}
                    color="white"
                    _hover={{ bgColor: "gray.200" }}
                    onClick={() => {
                        onToggle();
                        setIsEdit(!isEdit);
                    }}
                >
                    Cancel
                </Button>
            </form>
        </Collapse>
    );
});
export default CollapseEdit;
