import React from "react";
import styles from "./style.module.css";
import { Box, Button } from "@chakra-ui/react";

// Img
import NotFoundIllustration from "../../assets/img/404.png";

// React Router
import { useNavigate } from "react-router-dom";

// Components
import Layout from "../../Components/Layout";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Box>
                <img src={NotFoundIllustration} alt="404 Not Found" width={450} className={styles.img} />
            </Box>
            <Box>
                <Button
                    display="block"
                    bgColor="primary.index"
                    _hover={{ bgColor: "primary.hover" }}
                    borderRadius={50}
                    margin="auto"
                    onClick={() => navigate("/")}
                >
                    Back To Dashboard
                </Button>
            </Box>
        </Layout>
    );
};

export default PageNotFound;
