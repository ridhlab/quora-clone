import React, { useEffect } from "react";
import styles from "./style.module.css";
import { Box, Container, Flex, Text, UnorderedList } from "@chakra-ui/react";

// React Router
import { Link, useLocation, useNavigate } from "react-router-dom";

// Components
import Logo from "../Logo";
import NavItem from "./NavItem";
import LoginButton from "../LoginButton";
import ProfileButton from "../ProfileButton";

// Icons
import GroupIcon from "../Icon/Group";
import HomeIcon from "../Icon/Home";
import PenIcon from "../Icon/Pen";

// Store
import { useSelector, useDispatch } from "react-redux";
import { SET_LOGIN_FALSE } from "../../store/auth/action";

// GraphQL
import userQuery from "../../GraphQL/user/query";
import { useLazyQuery } from "@apollo/client";

// Module
import { removeAuth } from "../../auth/auth";

const Navbar = React.memo(() => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { pathname } = useLocation();

    const { GET_USER_BY_USERNAME } = userQuery;

    const { isLogin, username } = useSelector((state) => state.authReducer);

    const [getUserByUsername, { data }] = useLazyQuery(GET_USER_BY_USERNAME);

    const handleLogout = () => {
        dispatch(SET_LOGIN_FALSE());
        removeAuth();
        navigate("/");
    };

    useEffect(() => {
        if (username !== "") {
            getUserByUsername({
                variables: {
                    username: username,
                },
            });
        }
    }, [username]);

    return (
        <Box bgColor="white" boxShadow="0px 1px 7px rgba(0, 0, 0, 0.17)" py={2} position="sticky" top={0} zIndex={99}>
            <Container maxW={1000} display={{ base: "block", sm: "flex" }} justifyContent="space-between" margin="auto">
                <Flex alignItems="center">
                    <Link to="/">
                        <Logo />
                    </Link>
                </Flex>
                <UnorderedList display="flex" m={0} justifyContent={{ base: "space-between", sm: "flex-start" }} my={{ base: 4, sm: 0 }}>
                    <NavItem path="/" icon={<HomeIcon color={pathname === "/" ? "#2FD2DC" : "black"} />} />
                    <NavItem path="/question" icon={<PenIcon color={pathname === "/question" ? "#2FD2DC" : "black"} />} />
                    <NavItem path="/space" icon={<GroupIcon color={pathname === "/space" ? "#2FD2DC" : "black"} />} />
                </UnorderedList>
                <Box>
                    {!localStorage.getItem("userToken") && !isLogin ? <LoginButton /> : ""}
                    {isLogin && typeof data !== "undefined" && (
                        <Box className={styles.dropdown} cursor="pointer">
                            <ProfileButton profilePicture={data.users[0].profile_picture} name={data.users[0].name} username={data.users[0].username} />
                            <Box
                                className={styles.dropdownContent}
                                position="absolute"
                                bgColor="white"
                                minW={100}
                                padding={2}
                                boxShadow="0px 1px 7px rgba(0, 0, 0, 0.17)"
                                display="none"
                            >
                                <Text fontSize={14}>
                                    <Link to={`/user/${data.users[0].username}/answers`} className="link-underline">
                                        Profile
                                    </Link>
                                </Text>
                                <Box h=".5px" bgColor="gray.300" />
                                <Text fontSize={14}>
                                    <span className="link-underline" onClick={() => handleLogout()}>
                                        Logout
                                    </span>
                                </Text>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box>
    );
});

export default Navbar;
