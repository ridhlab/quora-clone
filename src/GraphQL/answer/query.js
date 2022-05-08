import { gql } from "@apollo/client";

const answerQuery = {
    GET_ANSWERS: gql`
        query getAnswers {
            answers(order_by: { id: desc }) {
                id
                user {
                    id
                    name
                    username
                    profile_picture
                }
                question {
                    question
                    id
                }
                answer
                upvote_count
                downvote_count
            }
        }
    `,
    GET_ANSWERS_BY_QUESTION_ID: gql`
        query getAnswersByQuestionId($question_id: Int!) {
            answers(where: { question_id: { _eq: $question_id } }, order_by: { id: desc }) {
                id
                answer
                upvote_count
                downvote_count
                user {
                    id
                    name
                    username
                    profile_picture
                }
            }
        }
    `,
    GET_ANSWERS_BY_USERNAME: gql`
        query getAnswersByUsername($username: String!) {
            answers(where: { user: { username: { _eq: $username } } }, order_by: { id: desc }) {
                id
                user {
                    id
                    username
                    name
                    profile_picture
                }
                question {
                    id
                    question
                }
                answer
                upvote_count
                downvote_count
            }
        }
    `,
    GET_ANSWERS_BY_SPACE_ID: gql`
        query getAnswersBySpaceId($space_id: Int!) {
            answers(where: { space_id: { _eq: $space_id } }, order_by: { id: desc }) {
                id
                user {
                    id
                    name
                    username
                    profile_picture
                }
                question {
                    id
                    question
                }
                answer
                downvote_count
                upvote_count
            }
        }
    `,
    GET_ASNWER_BY_QUESTION_ID_AND_USER_ID: gql`
        query getAnswerByQuestionIdAndUserId($question_id: Int!, $user_id: Int!) {
            answers(where: { question_id: { _eq: $question_id }, user_id: { _eq: $user_id } }) {
                id
                answer
            }
        }
    `,
};

export default answerQuery;