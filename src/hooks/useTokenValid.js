import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import userQuery from "../GraphQL/user/query";
import { useDispatch } from "react-redux";
import { SET_LOGIN_TRUE } from "../store/auth/action";

const useTokenValid = () => {
    const [isTokenValid, setIsTokenValid] = useState(false);

    const dispatch = useDispatch();

    const { GET_USER_FOR_AUTH } = userQuery;

    const [getUserForAuth, { data, loading, error }] = useLazyQuery(GET_USER_FOR_AUTH, {
        onCompleted: (data) => {
            const { users } = data;
            console.log(users);
            if (users.length === 1) {
                dispatch(SET_LOGIN_TRUE(users[0].id, users[0].username));
                setIsTokenValid(true);
            }
        },
    });

    const checkTokenValid = (encToken) => {
        try {
            if (/^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i.test(atob(encToken))) {
                getUserForAuth({
                    variables: {
                        username: atob(encToken),
                    },
                });
            }
        } catch (err) {}
    };

    return { checkTokenValid, isTokenValid };
};

export default useTokenValid;
