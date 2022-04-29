import { gql } from "@apollo/client";

const userQuery = {
    GET_USER_BY_USERNAME: gql`
        query getUserByUsername($username: String!) {
            users(where: { username: { _eq: $username } }) {
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
                    upvote_count
                    downvote_count
                }
            }
        }
    `,
    GET_USER_FOR_AUTH: gql`
        query getUserForAuth($username: String!) {
            users(where: { username: { _eq: $username } }) {
                username
                password
            }
        }
    `,
};

export default userQuery;
