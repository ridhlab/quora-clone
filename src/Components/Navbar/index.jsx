import { Box, Button, Container, Flex, Text, UnorderedList } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GroupIcon from "../Icon/Group";
import HomeIcon from "../Icon/Home";
import PenIcon from "../Icon/Pen";
import Logo from "../Logo";
import NavItem from "./NavItem";

const Navbar = () => {
    const location = useLocation();

    const { pathname } = location;

    return (
        <Box bgColor="white" boxShadow="0px 1px 7px rgba(0, 0, 0, 0.17)" py={2} position="sticky" top={0} zIndex={99}>
            <Container maxW={1000} display={{ base: "block", sm: "flex" }} justifyContent="space-between" margin="auto">
                <Flex alignItems="center">
                    <Logo />
                </Flex>
                <UnorderedList display="flex" m={0} justifyContent={{ base: "space-between", sm: "flex-start" }} my={{ base: 4, sm: 0 }}>
                    <NavItem path="/" icon={<HomeIcon color={pathname === "/" ? "#2FD2DC" : "black"} />} />
                    <NavItem path="/question" icon={<PenIcon color={pathname === "/question" ? "#2FD2DC" : "black"} />} />
                    <NavItem path="/space" icon={<GroupIcon color={pathname === "/space" ? "#2FD2DC" : "black"} />} />
                </UnorderedList>
                <Box>
                    <Button px={8} border="0" borderRadius={50} bgColor="primary.index" color="white" _hover={{ bgColor: "primary.hover" }}>
                        Login
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Navbar;
