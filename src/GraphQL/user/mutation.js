import { gql } from "@apollo/client";

const userMutation = {
    ADD_USER: gql`
        mutation addUser($name: String!, $username: String!, $password: String!) {
            insert_users_one(object: { name: $name, password: $password, username: $username }) {
                id
                username
                password
            }
        }
    `,
    UPDATE_NAME_USER: gql`
        mutation updateNameUser($username: String!, $newName: String!) {
            update_users(where: { username: { _eq: $username } }, _set: { name: $newName }) {
                affected_rows
                returning {
                    id
                    name
                    username
                }
            }
        }
    `,
    UPDATE_USERNAME_USER: gql`
        mutation updateUsernameUser($username: String!, $newUsername: String!) {
            update_users(where: { username: { _eq: $username } }, _set: { username: $newUsername }) {
                affected_rows
                returning {
                    id
                    name
                    username
                }
            }
        }
    `,
    UPDATE_BIO_USER: gql`
        mutation updateBioUser($username: String!, $newBio: String!) {
            update_users(where: { username: { _eq: $username } }, _set: { bio: $newBio }) {
                affected_rows
                returning {
                    id
                    name
                    username
                    bio
                }
            }
        }
    `,
    UPDATE_PROFILE_PICTURE_USER: gql`
        mutation updateProfilePictureUser($username: String!, $newBase64Img: String!) {
            update_users(where: { username: { _eq: $username } }, _set: { profile_picture: $newBase64Img }) {
                affected_rows
                returning {
                    id
                    name
                    username
                    bio
                }
            }
        }
    `,
};

export default userMutation;
