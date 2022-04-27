import { useEffect, useState } from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../Components/Layout";
import { useLazyQuery } from "@apollo/client";

import userQuery from "../../../GraphQl/user/query";
import Card from "../../../Components/Card";
import Tab from "../../../Components/Tab";

const User = () => {
    const { username } = useParams();

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const { GET_USER_BY_USERNAME } = userQuery;

    const [getUserByUsername, { data: dataUser, loading, error }] = useLazyQuery(GET_USER_BY_USERNAME);

    const [user, setUser] = useState({
        name: "",
        username: "",
        profile_picture: "",
        answers: [],
        questions: [],
    });

    const [tabActive, setTabActive] = useState(pathname.split("/").pop());

    const { name, profile_picture, bio, answers, questions } = user;

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

    useEffect(() => {
        checkPath();
        getUserByUsername({
            variables: {
                username,
            },
        });
    }, []);

    useEffect(() => {
        if (typeof dataUser !== "undefined") {
            setUser(dataUser.users[0]);
        }
    }, [dataUser]);

    return (
        <Layout>
            <Box maxW={500} margin="auto">
                <Card>
                    {typeof dataUser !== "undefined" && (
                        <>
                            <Box>
                                <Box>
                                    <img src={profile_picture} alt={username} width={100} />
                                </Box>
                                <Text fontWeight={500} fontSize={20}>
                                    {name}
                                </Text>
                                <Text fontSize={14} color="gray.500">
                                    @{username}
                                </Text>
                                <Text my={2}>{bio}</Text>
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
