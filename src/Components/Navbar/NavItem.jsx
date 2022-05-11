import React from "react";
import { ListItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavItem = React.memo(({ icon, path }) => {
    return (
        <ListItem listStyleType="none" mx={{ base: 2, md: 8 }} display="flex" alignItems="center">
            <NavLink to={path}>{icon}</NavLink>
        </ListItem>
    );
});

export default NavItem;
