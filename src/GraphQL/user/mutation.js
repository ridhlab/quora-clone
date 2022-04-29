import { gql } from "@apollo/client";

const userMutation = {
    ADD_USER: gql`
        mutation ($name: String!, $username: String!, $password: String!) {
            insert_users_one(object: { name: $name, password: $password, username: $username }) {
                id
                username
                password
            }
        }
    `,
};

export default userMutation;
