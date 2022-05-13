import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Box, Flex, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, ModalCloseButton } from "@chakra-ui/react";

// React router
import { Link } from "react-router-dom";

// COmponents
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";

// Icons
import { IoMdAddCircle } from "react-icons/io";

// Store
import { useSelector } from "react-redux";

// GraphQL
import { useLazyQuery, useMutation } from "@apollo/client";
import spaceQuery from "../../GraphQL/space/query";
import spaceMutation from "../../GraphQL/space/mutation";

const Space = () => {
    const [nameValue, setNameValue] = useState("");

    const [descValue, setDescValue] = useState("");

    const { GET_SPACES } = spaceQuery;

    const { ADD_SPACE } = spaceMutation;

    const { isLogin, userId: userIdStore } = useSelector((state) => state.authReducer);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [getSpaces, { data: spaces }] = useLazyQuery(GET_SPACES);

    const [addSpace] = useMutation(ADD_SPACE, {
        onCompleted: (data) => {
            onClose();
        },
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_SPACES, "getSpaces"],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nameValue !== "" && descValue !== "") {
            addSpace({
                variables: {
                    name: nameValue,
                    desc: descValue,
                    user_id: userIdStore,
                },
            });
        }
    };

    const handleClose = () => {
        setNameValue("");
        setDescValue("");
        onClose();
    };

    useEffect(() => {
        getSpaces();
    }, []);

    return (
        <Layout>
            <Box maxW={500} margin="auto">
                {spaces?.spaces.map((space, idx) => {
                    const { id, name, description, space_picture } = space;
                    return (
                        <Card key={id}>
                            <Flex alignItems="center">
                                <Box minWidth={76}>
                                    <img src={space_picture} width={76} alt={name} style={{ borderRadius: 50 }} />
                                </Box>
                                <Box ml={4}>
                                    <Text fontWeight={500}>
                                        <Link to={`/space/${id}/answers`} className="link-underline">
                                            {name}
                                        </Link>
                                    </Text>
                                    <Text fontSize={14}>{description}</Text>
                                </Box>
                            </Flex>
                        </Card>
                    );
                })}
            </Box>
            {isLogin && (
                <>
                    <Flex>
                        <Button
                            alignItems="center"
                            p={2}
                            bgColor="primary.index"
                            borderRadius={50}
                            color="white"
                            position="fixed"
                            bottom={10}
                            right={{ base: "10%", md: "20%", lg: "28%" }}
                            _hover={{ bgColor: "primary.hover" }}
                            onClick={() => onOpen()}
                        >
                            <IoMdAddCircle />
                            <Text fontSize={13}>Tambah Ruang</Text>
                        </Button>
                    </Flex>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent p={4}>
                            <ModalHeader>Tambah Ruang</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit}>
                                    <Box>
                                        <label className={styles.label}>Nama Ruang</label>
                                        <input
                                            className={styles.input}
                                            name="name"
                                            value={nameValue}
                                            onChange={(e) => setNameValue(e.target.value)}
                                            required
                                            autoComplete="off"
                                        />
                                    </Box>
                                    <Box>
                                        <label className={styles.label}>Deskripsi</label>
                                        <textarea
                                            className={styles.input}
                                            rows={3}
                                            name="desc"
                                            value={descValue}
                                            onChange={(e) => setDescValue(e.target.value)}
                                            required
                                            autoComplete="off"
                                        />
                                    </Box>
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
                                            py={3}
                                            _hover={{ bgColor: "primary.hover" }}
                                        >
                                            Tambah
                                        </Button>
                                        <Button
                                            display="inline-block"
                                            h="auto"
                                            borderRadius={50}
                                            fontSize={13}
                                            mx={2}
                                            px={8}
                                            py={3}
                                            onClick={() => handleClose()}
                                        >
                                            Cancel
                                        </Button>
                                    </Flex>
                                </form>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </>
            )}
        </Layout>
    );
};

export default Space;
