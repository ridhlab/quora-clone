import { gql } from "@apollo/client";

const upvoteMutation = {
    // Upvote
    ADD_UPVOTE: gql`
        mutation addUpvote($answer_id: Int!, $user_id: Int!) {
            insert_upvote_one(object: { answer_id: $answer_id, user_id: $user_id }) {
                id
                user_id
                answer_id
            }
        }
    `,

    // Unupvote
    DELETE_UPVOTE: gql`
        mutation deleteUpvote($user_id: Int!, $answer_id: Int!) {
            delete_upvote(where: { user_id: { _eq: $user_id }, answer_id: { _eq: $answer_id } }) {
                returning {
                    id
                    user_id
                    answer_id
                }
            }
        }
    `,
};

const downvoteMutation = {
    // Downvote
    ADD_DOWNVOTE: gql`
        mutation addDownvote($answer_id: Int!, $user_id: Int!) {
            insert_downvote_one(object: { answer_id: $answer_id, user_id: $user_id }) {
                id
                user_id
                answer_id
            }
        }
    `,

    //Undownvote
    DELETE_DOWNVOTE: gql`
        mutation deleteDownvote($user_id: Int!, $answer_id: Int!) {
            delete_downvote(where: { user_id: { _eq: $user_id }, answer_id: { _eq: $answer_id } }) {
                returning {
                    id
                    user_id
                    answer_id
                }
            }
        }
    `,
};

export { upvoteMutation, downvoteMutation };
