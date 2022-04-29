import { gql } from "@apollo/client";

const spaceQuery = {
    GET_SPACES: gql`
        query getSpaces {
            spaces(order_by: { id: desc }) {
                id
                name
                description
                space_picture
            }
        }
    `,
    GET_SPACE_BY_ID: gql`
        query getSpaceById($space_id: Int!) {
            spaces_by_pk(id: $space_id) {
                id
                name
                description
                space_picture
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
};

export default spaceQuery;
