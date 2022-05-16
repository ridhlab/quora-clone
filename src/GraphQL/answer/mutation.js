import { gql } from "@apollo/client";

const answerMutation = {
    ADD_ANSWER: gql`
        mutation addAnswer($question_id: Int!, $user_id: Int!, $answer: String!, $space_id: Int!) {
            insert_answers_one(object: { question_id: $question_id, user_id: $user_id, answer: $answer, space_id: $space_id }) {
                answer
                question {
                    question
                }
                space {
                    name
                }
                user {
                    name
                    username
                }
            }
        }
    `,
    EDIT_ANSWER_BY_ID: gql`
        mutation editAnswerById($answer_id: Int!, $answer: String!) {
            update_answers_by_pk(pk_columns: { id: $answer_id }, _set: { answer: $answer }) {
                answer
                id
                question {
                    question
                    id
                }
                space {
                    id
                    name
                }
            }
        }
    `,
    DELETE_ANSWER: gql`
        mutation deleteAnswer($answer_id: Int!) {
            delete_answers_by_pk(id: $answer_id) {
                id
                answer
                question {
                    id
                    question
                }
            }
        }
    `,
};

export default answerMutation;
