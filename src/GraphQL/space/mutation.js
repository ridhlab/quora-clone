import { gql } from "@apollo/client";

const spaceMutation = {
    ADD_SPACE: gql`
        mutation addSpace($name: String!, $desc: String!) {
            insert_spaces_one(object: { description: $desc, name: $name }) {
                id
                name
                description
            }
        }
    `,
    UPDATE_NAME_SPACE: gql`
        mutation updateNameSpace($space_id: Int!, $new_name: String!) {
            update_spaces_by_pk(pk_columns: { id: $space_id }, _set: { name: $new_name }) {
                id
                name
                description
                space_picture
                user_id
            }
        }
    `,
    UPDATE_DESC_SPACE: gql`
        mutation updateDescSpace($space_id: Int!, $new_desc: String!) {
            update_spaces_by_pk(pk_columns: { id: $space_id }, _set: { description: $new_desc }) {
                id
                name
                description
                space_picture
                user_id
            }
        }
    `,
    UPDATE_SPACE_PICTURE: gql`
        mutation updateSpacePicture($space_id: Int!, $new_base64_picture: String!) {
            update_spaces_by_pk(pk_columns: { id: $space_id }, _set: { space_picture: $new_base64_picture }) {
                id
                name
                description
                space_picture
                user_id
            }
        }
    `,
};

export default spaceMutation;
