import { useEffect } from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Layout from "../../Components/Layout";

import { useLazyQuery } from "@apollo/client";
import spaceQuery from "../../GraphQl/space/query";
import Card from "../../Components/Card";
import { Link } from "react-router-dom";

const Space = () => {
    const { GET_SPACES } = spaceQuery;

    const [getSpaces, { data: spaces, loading, error }] = useLazyQuery(GET_SPACES);

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
                                <Box>
                                    <img src={space_picture} width={76} alt={name} />
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
        </Layout>
    );
};

export default Space;