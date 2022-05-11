import { gql } from "@apollo/client";

const upvoteQuery = {
    // That's mean get upvote count in a answer
    GET_UPVOTE_BY_ANSWER_ID: gql`
        query getUpvoteByAnswerId($answer_id: Int!) {
            upvote(where: { answer_id: { _eq: $answer_id } }) {
                answer {
                    id
                    answer
                    question {
                        id
                        question
                    }
                }
                user_id
            }
        }
    `,
};

const downvoteQuery = {
    // That's mean get downvote count in a answer
    GET_DOWNVOTE_BY_ANSWER_ID: gql`
        query getDownvoteByAnswerId($answer_id: Int!) {
            downvote(where: { answer_id: { _eq: $answer_id } }) {
                answer {
                    id
                    answer
                    question {
                        id
                        question
                    }
                }
                user_id
            }
        }
    `,
};

export { upvoteQuery, downvoteQuery };
