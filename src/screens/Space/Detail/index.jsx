import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

// React router
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

// Components
import Card from "../../../Components/Card";
import Layout from "../../../Components/Layout";
import Tab from "../../../Components/Tab";

// GraphQL
import { useLazyQuery } from "@apollo/client";
import spaceQuery from "../../../GraphQL/space/query";

const SpaceDetail = () => {
    const { pathname } = useLocation();

    const navigate = useNavigate();

    const { spaceId } = useParams();

    const { GET_SPACE_BY_ID } = spaceQuery;

    const [getSpaceById, { data: spaceData }] = useLazyQuery(GET_SPACE_BY_ID);

    const [space, setSpace] = useState({
        id: "",
        name: "",
        description: "",
        space_picture: "",
        questions: [],
        answers: [],
    });

    const [tabActive, setTabActive] = useState(pathname.split("/").pop());

    const { name, description, space_picture, questions, answers } = space;

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
        getSpaceById({
            variables: {
                space_id: spaceId,
            },
        });
    }, []);

    useEffect(() => {
        if (typeof spaceData !== "undefined") {
            setSpace(spaceData.spaces_by_pk);
        }
    }, [spaceData]);

    return (
        <Layout>
            <Box maxW={500} margin="auto">
                <Card>
                    {typeof spaceData !== "undefined" && (
                        <>
                            <Box>
                                <Box>
                                    <img src={space_picture} alt={name} width={76} />
                                </Box>
                                <Box>
                                    <Text fontWeight={500} fontSize={20}>
                                        {name}
                                    </Text>
                                    <Text fontSize={14} my={2}>
                                        {description}
                                    </Text>
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
