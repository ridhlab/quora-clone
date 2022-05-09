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
};

export default spaceMutation;
