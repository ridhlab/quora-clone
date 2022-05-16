import { gql } from "@apollo/client";

const userQuery = {
    GET_USER_BY_USERNAME: gql`
        query getUserByUsername($username: String!) {
            users(where: { username: { _eq: $username } }) {
                id
                name
                username
                bio
                profile_picture
                questions {
                    id
                    question
                }
                answers {
                    id
                    answer
                }
            }
        }
    `,
    GET_USER_FOR_AUTH: gql`
        query getUserForAuth($username: String!) {
            users(where: { username: { _eq: $username } }) {
                id
                username
                password
            }
        }
    `,
};

export default userQuery;
