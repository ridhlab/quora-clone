import { gql } from "@apollo/client";

const questionQuery = {
    GET_QUESTIONS: gql`
        query getQuestions {
            questions(order_by: { id: desc }) {
                id
                question
                answers {
                    answer
                    upvote_count
                    downvote_count
                    user {
                        name
                        username
                        profile_picture
                    }
                }
                space_id
            }
        }
    `,
    GET_QUESTION_BY_ID: gql`
        query getQuestionById($question_id: Int!) {
            questions_by_pk(id: $question_id) {
                id
                question
                space_id
                user_id
            }
        }
    `,
    GET_QUESTIONS_BY_USERNAME: gql`
        query getQuestionsByUsername($username: String!) {
            questions(where: { user: { username: { _eq: $username } } }, order_by: { id: desc }) {
                id
                question
                answers {
                    id
                    answer
                }
                space_id
            }
        }
    `,
    GET_QUESTIONS_BY_SPACE_ID: gql`
        query getQuestionBySpaceId($space_id: Int!) {
            questions(where: { space_id: { _eq: $space_id } }, order_by: { id: desc }) {
                id
                question
                answers {
                    id
                    answer
                }
                space_id
            }
        }
    `,
    // GET_SPACE_FROM_QUESTION: gql`
    //     query getSpaceFromQuestion($question_id: Int!) {
    //         questions_by_pk(id: $question_id) {
    //             id
    //             question
    //             space_id
    //         }
    //     }
    // `,
};

export default questionQuery;
