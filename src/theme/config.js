import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#EFEFEF",
            },
        },
    },
    colors: {
        primary: {
            index: "#2FD2DC",
            hover: "#14BCC7",
        },
    },
});

export default theme;
