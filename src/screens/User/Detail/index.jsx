import React, { useCallback, useEffect, useState } from "react";
import styles from "./style.module.css";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";

// React router
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

// Components
import Layout from "../../../Components/Layout";
import Card from "../../../Components/Card";
import Tab from "../../../Components/Tab";
import CollapseEdit from "../../../Components/FormEdit/CollapseEdit";
import EditIcon from "../../../Components/FormEdit/EditIcon";
import { ErrorMessageWithCard } from "../../../Components/AuthErrorMessage";
import ButtonWithIcon from "../../../Components/ButtonWithIcon";

// Icons
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

// Store
import { useSelector } from "react-redux";

// GraphQL
import { useLazyQuery, useMutation } from "@apollo/client";
import userQuery from "../../../GraphQL/user/query";
import userMutation from "../../../GraphQL/user/mutation";

// Hooks
import useUsernameExist from "../../../hooks/useUsernameExist";

// Module
import { setAuth } from "../../../auth/auth";

// Library
import { useDropzone } from "react-dropzone";

const User = () => {
    const { username: usernameParams } = useParams();

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const { isLogin, username: usernameStore } = useSelector((state) => state.authReducer);

    // value form

    const [valueNameEdit, setValueNameEdit] = useState("");
    const [valueUsernameEdit, setValueUsernameEdit] = useState("");
    const [valueBioEdit, setValueBioEdit] = useState("");

    // end value form

    const [base64ImgProfile, setBase64ImgProfile] = useState("");

    // animation edit

    const { isOpen: isOpenName, onToggle: onToggleName } = useDisclosure();
    const { isOpen: isOpenUsername, onToggle: onToggleUsername } = useDisclosure();
    const { isOpen: isOpenBio, onToggle: onToggleBio } = useDisclosure();

    // end animation edit

    // is edit

    const [isEditName, setIsEditName] = useState(false);
    const [isEditUsername, setIsEditUsername] = useState(false);
    const [isEditBio, setIsEditBio] = useState(false);

    // end is edit

    const [tabActive, setTabActive] = useState(pathname.split("/").pop());

    const [user, setUser] = useState({
        name: "",
        username: "",
        profile_picture: "",
        answers: [],
        questions: [],
    });

    const { name, username, profile_picture, bio, answers, questions } = user;

    const { checkUsernameExist, isUsernameExist: isUsernameExistHooks, resetIsExist } = useUsernameExist();

    const [isUsernameExist, setIsUsernameExist] = useState(isUsernameExistHooks);

    const { GET_USER_BY_USERNAME } = userQuery;

    const [getUserByUsername, { data: dataUser }] = useLazyQuery(GET_USER_BY_USERNAME, {
        onCompleted: (data) => {
            setUser(data.users[0]);
            setValueNameEdit(data.users[0].name);
            setValueUsernameEdit(data.users[0].username);
            setBase64ImgProfile(data.users[0].profile_picture);
            if (data.users[0].bio === null) {
                setValueBioEdit("");
            } else {
                setValueBioEdit(data.users[0].bio);
            }
        },
    });

    const { UPDATE_NAME_USER, UPDATE_USERNAME_USER, UPDATE_BIO_USER, UPDATE_PROFILE_PICTURE_USER } = userMutation;

    const [updateNameUser] = useMutation(UPDATE_NAME_USER, {
        refetchQueries: [GET_USER_BY_USERNAME, "getUserByUsername"],
    });

    const [updateUsernameUser] = useMutation(UPDATE_USERNAME_USER, {
        refetchQueries: [GET_USER_BY_USERNAME, "getUserByUsername"],
        onCompleted: (data) => {
            setAuth(btoa(data.update_users.returning[0].username));
            window.location.pathname = `/user/${data.update_users.returning[0].username}/answers`;
        },
    });

    const [updateBioUser] = useMutation(UPDATE_BIO_USER, {
        refetchQueries: [GET_USER_BY_USERNAME, "getUserByUsername"],
    });

    const [updateProfilePictureUser] = useMutation(UPDATE_PROFILE_PICTURE_USER, {
        refetchQueries: [GET_USER_BY_USERNAME, "getUserByUsername"],
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
            .then((result) => {
                setBase64ImgProfile(result);
            })
            .catch((error) => {
                console.log(error);
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

    const handleEdit = (value, editName) => {
        if (editName === "name") {
            updateNameUser({
                variables: {
                    username,
                    newName: value,
                },
            });
        }
        if (editName === "username") {
            checkUsernameExist(value);
        }
        if (editName === "bio") {
            updateBioUser({
                variables: {
                    username,
                    newBio: value,
                },
            });
        }
    };

    const handleClickEditPicture = () => {
        updateProfilePictureUser({
            variables: {
                username,
                newBase64Img: base64ImgProfile,
            },
        });
    };

    useEffect(() => {
        if (isUsernameExistHooks !== "") {
            if (isUsernameExistHooks) {
                setIsUsernameExist(true);
            } else {
                updateUsernameUser({
                    variables: {
                        username,
                        newUsername: valueUsernameEdit,
                    },
                });
            }
        }
    }, [isUsernameExistHooks]);

    useEffect(() => {
        if (isUsernameExist) {
            setTimeout(() => {
                setIsUsernameExist("");
                resetIsExist();
            }, 2000);
        }
    }, [isUsernameExist]);

    useEffect(() => {
        checkPath();
        getUserByUsername({
            variables: {
                username: usernameParams,
            },
        });
    }, [usernameParams]);

    useEffect(() => {
        if (!isEditName) {
            setValueNameEdit(name);
        }
    }, [isEditName]);

    useEffect(() => {
        if (!isEditUsername) {
            setValueUsernameEdit(username);
        }
    }, [isEditUsername]);

    useEffect(() => {
        if (!isEditBio) {
            if (bio === null) {
                setValueBioEdit("");
            } else {
                setValueBioEdit(bio);
            }
        }
    }, [isEditBio]);

    return (
        <Layout>
            <Box maxW={500} margin="auto">
                <Card>
                    {typeof dataUser !== "undefined" && (
                        <>
                            <Box>
                                <Flex>
                                    <Box
                                        _hover={{
                                            bgColor: isLogin && usernameParams === usernameStore ? "gray.500" : "",
                                            cursor: isLogin && usernameParams === usernameStore ? "pointer" : "",
                                            borderRadius: isLogin && usernameParams === usernameStore ? 50 : "",
                                        }}
                                        position="relative"
                                        className={styles.wrapperProfilePic}
                                        onClick={() => (isLogin && usernameParams === usernameStore ? document.getElementById("uploadImage").click() : "")}
                                    >
                                        <img src={base64ImgProfile} alt={username} width={100} style={{ borderRadius: 50 }} />
                                        {isLogin && usernameParams === usernameStore && (
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
                                {base64ImgProfile !== profile_picture ? (
                                    <>
                                        <Button
                                            fontSize={12}
                                            display="inline-block"
                                            p={1}
                                            h="auto"
                                            bgColor="primary.index"
                                            color="white"
                                            _hover={{ bgColor: "primary.hover" }}
                                            onClick={() => handleClickEditPicture()}
                                        >
                                            Ganti Gambar
                                        </Button>
                                        <Button
                                            mx={2}
                                            fontSize={12}
                                            display="inline-block"
                                            p={1}
                                            h="auto"
                                            bgColor="gray.300"
                                            color="white"
                                            _hover={{ bgColor: "gray.200" }}
                                            onClick={() => setBase64ImgProfile(profile_picture)}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    ""
                                )}
                                <Box>
                                    <Box
                                        display={usernameParams === usernameStore ? "flex" : "block"}
                                        alignItems={usernameParams === usernameStore ? "center" : null}
                                    >
                                        <Text fontWeight={500} fontSize={20}>
                                            {name}
                                        </Text>
                                        {usernameParams === usernameStore && <EditIcon onToggle={onToggleName} setIsEdit={setIsEditName} isEdit={isEditName} />}
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
                                </Box>
                                <Box>
                                    <Box
                                        display={usernameParams === usernameStore ? "flex" : "block"}
                                        alignItems={usernameParams === usernameStore ? "center" : null}
                                    >
                                        <Text fontSize={14} color="gray.500">
                                            @{username}
                                        </Text>
                                        {usernameParams === usernameStore && (
                                            <EditIcon isEdit={isEditUsername} onToggle={onToggleUsername} setIsEdit={setIsEditUsername} />
                                        )}
                                    </Box>
                                    <CollapseEdit
                                        isOpen={isOpenUsername}
                                        onToggle={onToggleUsername}
                                        isEdit={isEditUsername}
                                        setIsEdit={setIsEditUsername}
                                        valueEdit={valueUsernameEdit}
                                        setValueEdit={setValueUsernameEdit}
                                        editName="username"
                                        handleEdit={handleEdit}
                                    />
                                    {isUsernameExist ? (
                                        <Box mt={2}>
                                            <ErrorMessageWithCard message="Username sudah ada" />
                                        </Box>
                                    ) : (
                                        ""
                                    )}
                                </Box>
                                <Box>
                                    <Box
                                        display={usernameParams === usernameStore ? "flex" : "block"}
                                        alignItems={usernameParams === usernameStore ? "center" : null}
                                    >
                                        <Text my={2} fontSize={13}>
                                            {bio}
                                        </Text>
                                        {usernameParams === usernameStore ? (
                                            bio !== null ? (
                                                <EditIcon isEdit={isEditBio} onToggle={onToggleBio} setIsEdit={setIsEditBio} />
                                            ) : (
                                                <Box
                                                    my={2}
                                                    onClick={() => {
                                                        onToggleBio();
                                                        setIsEditBio(!isEditBio);
                                                    }}
                                                >
                                                    {isEditBio ? (
                                                        <ButtonWithIcon icon={<AiOutlineMinusCircle />} text="Tambah Bio" />
                                                    ) : (
                                                        <ButtonWithIcon icon={<AiOutlinePlusCircle />} text="Tambah Bio" />
                                                    )}
                                                </Box>
                                            )
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                    <CollapseEdit
                                        isOpen={isOpenBio}
                                        onToggle={onToggleBio}
                                        isEdit={isEditBio}
                                        setIsEdit={setIsEditBio}
                                        valueEdit={valueBioEdit}
                                        setValueEdit={setValueBioEdit}
                                        editName="bio"
                                        handleEdit={handleEdit}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Flex justifyContent="center">
                                    <Tab text={`${answers.length} jawaban`} tabActive={tabActive} tabName="answers" handleClickTab={handleClickTab} />
                                    <Tab text={`${questions.length} pertanyaan`} tabActive={tabActive} tabName="questions" handleClickTab={handleClickTab} />
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

export default User;
