import styles from "./style.module.css";
import { ModalBody, ModalOverlay, ModalContent, ModalHeader, Flex, Button } from "@chakra-ui/react";

const ModalEdit = ({ modalTitle, valueEdit, setValueEdit, handleSubmit, handleClickClose }) => {
    return (
        <>
            <ModalOverlay />
            <ModalContent p={4}>
                <ModalHeader>{modalTitle}</ModalHeader>
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <input className={styles.modalInput} value={valueEdit} onChange={(e) => setValueEdit(e.target.value)} />
                        <Flex justifyContent="flex-end" mt={4}>
                            <Button
                                type="submit"
                                bgColor="primary.index"
                                display="inline-block"
                                h="auto"
                                color="white"
                                borderRadius={50}
                                fontSize={13}
                                mx={2}
                                px={8}
                                py={2}
                                _hover={{ bgColor: "primary.hover" }}
                            >
                                Edit
                            </Button>
                            <Button display="inline-block" h="auto" borderRadius={50} fontSize={13} mx={2} px={8} py={2} onClick={() => handleClickClose()}>
                                Cancel
                            </Button>
                        </Flex>
                    </ModalBody>
                </form>
            </ModalContent>
        </>
    );
};

export default ModalEdit;
