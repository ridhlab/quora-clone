import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import userQuery from "../GraphQL/user/query";

const useUsernameExist = () => {
    const [isUsernameExist, setIsUsernameExist] = useState("");

    const { GET_USER_FOR_AUTH } = userQuery;

    const [getUserForAuth] = useLazyQuery(GET_USER_FOR_AUTH, {
        onCompleted: (data) => {
            const { users } = data;
            if (users.length === 1) {
                setIsUsernameExist(true);
            } else {
                if (users.length === 0) {
                    setIsUsernameExist(false);
                }
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const checkUsernameExist = (username) => {
        getUserForAuth({ variables: { username } });
    };

    const resetIsExist = () => {
        setIsUsernameExist("");
    };

    return { checkUsernameExist, isUsernameExist, resetIsExist };
};

export default useUsernameExist;
