import React, { useCallback, useEffect, useState } from "react";
import styles from "./style.module.css";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";

// React router
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

// Components
import Card from "../../../Components/Card";
import Layout from "../../../Components/Layout";
import Tab from "../../../Components/Tab";
import EditIcon from "../../../Components/FormEdit/EditIcon";
import CollapseEdit from "../../../Components/FormEdit/CollapseEdit";

// Store
import { useSelector } from "react-redux";

// GraphQL
import { useMutation, useQuery } from "@apollo/client";
import spaceQuery from "../../../GraphQL/space/query";
import spaceMutation from "../../../GraphQL/space/mutation";

// Library
import { useDropzone } from "react-dropzone";

const SpaceDetail = () => {
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const { spaceId } = useParams();

    const { GET_SPACE_BY_ID } = spaceQuery;

    const { UPDATE_NAME_SPACE, UPDATE_DESC_SPACE, UPDATE_SPACE_PICTURE } = spaceMutation;

    const { isLogin, userId: userIdStore } = useSelector((state) => state.authReducer);

    const [space, setSpace] = useState({
        id: "",
        name: "",
        description: "",
        space_picture: "",
        user_id: "",
        questions: [],
        answers: [],
    });

    const { name, description, space_picture, questions, answers, user_id: userIdSpaceAdmin } = space;

    // Value form

    const [valueNameEdit, setValueNameEdit] = useState("");
    const [valueDescEdit, setValueDescEdit] = useState("");

    // End value form

    const [base64imgProfileSpace, setBase64ImgProfileSpace] = useState("");

    // Animation edit

    const { isOpen: isOpenName, onToggle: onToggleName } = useDisclosure();
    const { isOpen: isOpenDesc, onToggle: onToggleDesc } = useDisclosure();

    // Animation edit

    // Is edit

    const [isEditName, setIsEditName] = useState(false);
    const [isEditDesc, setIsEditDesc] = useState(false);

    // End is edit

    const [tabActive, setTabActive] = useState(pathname.split("/").pop());

    const { data: spaceData } = useQuery(GET_SPACE_BY_ID, {
        variables: {
            space_id: spaceId,
        },
        onCompleted: (data) => {
            setSpace(data.spaces_by_pk);
            setValueNameEdit(data.spaces_by_pk.name);
            setValueDescEdit(data.spaces_by_pk.description);
            setBase64ImgProfileSpace(data.spaces_by_pk.space_picture);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [updateNameSpace] = useMutation(UPDATE_NAME_SPACE, {
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_SPACE_BY_ID, "getSpaceById"],
    });

    const [updateDescSpace] = useMutation(UPDATE_DESC_SPACE, {
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_SPACE_BY_ID, "getSpaceById"],
    });

    const [updateSpacePicture] = useMutation(UPDATE_SPACE_PICTURE, {
        onError: (err) => {
            console.log(err);
        },
        refetchQueries: [GET_SPACE_BY_ID, "getSpaceById"],
    });

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const onDrop = useCallback((acceptedFiles) => {
        getBase64(acceptedFiles[0])
            .then((res) => {
                setBase64ImgProfileSpace(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleClickTab = (tab) => {
        setTabActive(tab);
        navigate(`${tab}`);
    };

    const checkPath = () => {
        let pathArr = pathname.split("/");
        pathArr.shift();
        if (pathArr[pathArr.length - 1] !== "answers" && pathArr[pathArr.length - 1] !== "questions") {
            navigate(`answers`, { replace: true });
        }
    };

    const handleClickEditSpacePic = () => {
        updateSpacePicture({
            variables: {
                space_id: spaceId,
                new_base64_picture: base64imgProfileSpace,
            },
        });
    };

    const handleEdit = (_value, _editName) => {
        if (_editName === "name") {
            updateNameSpace({
                variables: {
                    space_id: spaceId,
                    new_name: _value,
                },
            });
        }
        if (_editName === "desc") {
            updateDescSpace({
                variables: {
                    space_id: spaceId,
                    new_desc: _value,
                },
            });
        }
    };

    useEffect(() => {
        if (!isEditName) {
            setValueNameEdit(name);
        }
    }, [isEditName]);

    useEffect(() => {
        if (!isEditDesc) {
            setValueDescEdit(description);
        }
    }, [isEditDesc]);

    useEffect(() => {
        checkPath();
    }, []);

    return (
        <Layout>
            <Box maxW={500} margin="auto">
                <Card>
                    {typeof spaceData !== "undefined" && (
                        <>
                            <Box>
                                <Flex>
                                    <Box
                                        _hover={{
                                            bgColor: isLogin && userIdStore === userIdSpaceAdmin ? "gray.500" : "",
                                            cursor: isLogin && userIdStore === userIdSpaceAdmin ? "pointer" : "",
                                            borderRadius: isLogin && userIdStore === userIdSpaceAdmin ? 50 : "",
                                        }}
                                        position="relative"
                                        className={styles.wrapperSpacePic}
                                        onClick={() => (isLogin && userIdStore === userIdSpaceAdmin ? document.getElementById("uploadImage").click() : "")}
                                    >
                                        <img src={base64imgProfileSpace} alt={name} width={76} style={{ borderRadius: 50 }} />
                                        {isLogin && userIdStore === userIdSpaceAdmin && (
                                            <>
                                                <Box
                                                    width="100%"
                                                    height="100%"
                                                    fontSize={12}
                                                    position="absolute"
                                                    bgColor="rgba(0, 0, 0, .4)"
                                                    top="0"
                                                    left="0"
                                                    color="white"
                                                    borderRadius={50}
                                                    display="none"
                                                    className={styles.editText}
                                                    margin="auto"
                                                >
                                                    <Flex justifyContent="center" alignItems="center" height="100%">
                                                        <Text fontWeight={500}>Edit Foto</Text>
                                                    </Flex>
                                                </Box>
                                                <Box {...getRootProps()} id="uploadImage">
                                                    <input {...getInputProps()} value="" />
                                                </Box>
                                            </>
                                        )}
                                    </Box>
                                </Flex>
                                {base64imgProfileSpace !== space_picture ? (
                                    <>
                                        <Button
                                            fontSize={12}
                                            display="inline-block"
                                            p={1}
                                            h="auto"
                                            bgColor="primary.index"
                                            color="white"
                                            _hover={{ bgColor: "primary.hover" }}
                                            onClick={() => handleClickEditSpacePic()}
                                        >
                                            Ganti Gambar
                                        </Button>
                                        <Button
                                            fontSize={12}
                                            mx={2}
                                            display="inline-block"
                                            p={1}
                                            h="auto"
                                            bgColor="gray.300"
                                            color="white"
                                            _hover={{ bgColor: "gray.200" }}
                                            onClick={() => setBase64ImgProfileSpace(space_picture)}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    ""
                                )}
                                <Box>
                                    <Box
                                        display={userIdStore === userIdSpaceAdmin ? "flex" : "block"}
                                        alignItems={userIdStore === userIdSpaceAdmin ? "center" : null}
                                    >
                                        <Text fontWeight={500} fontSize={20}>
                                            {name}
                                        </Text>
                                        {userIdStore === userIdSpaceAdmin && <EditIcon isEdit={isEditName} onToggle={onToggleName} setIsEdit={setIsEditName} />}
                                    </Box>
                                    <CollapseEdit
                                        isOpen={isOpenName}
                                        onToggle={onToggleName}
                                        isEdit={isEditName}
                                        setIsEdit={setIsEditName}
                                        valueEdit={valueNameEdit}
                                        setValueEdit={setValueNameEdit}
                                        editName="name"
                                        handleEdit={handleEdit}
                                    />
                                    <Box
                                        display={userIdStore === userIdSpaceAdmin ? "flex" : "block"}
                                        alignItems={userIdStore === userIdSpaceAdmin ? "center" : null}
                                    >
                                        <Text fontSize={14} my={2}>
                                            {description}
                                        </Text>
                                        {userIdStore === userIdSpaceAdmin && <EditIcon isEdit={isEditDesc} onToggle={onToggleDesc} setIsEdit={setIsEditDesc} />}
                                    </Box>
                                    <CollapseEdit
                                        isOpen={isOpenDesc}
                                        onToggle={onToggleDesc}
                                        isEdit={isEditDesc}
                                        setIsEdit={setIsEditDesc}
                                        valueEdit={valueDescEdit}
                                        setValueEdit={setValueDescEdit}
                                        editName="desc"
                                        handleEdit={handleEdit}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Flex justifyContent="center">
                                    <Tab text={`${answers.length} jawaban`} tabName="answers" tabActive={tabActive} handleClickTab={handleClickTab} />
                                    <Tab text={`${questions.length} pertanyaan`} tabName="questions" tabActive={tabActive} handleClickTab={handleClickTab} />
                                </Flex>
                            </Box>
                        </>
                    )}
                    <Outlet />
                </Card>
            </Box>
        </Layout>
    );
};

export default SpaceDetail;
