import { gql } from "@apollo/client";

const questionMutation = {
    ADD_QUESTION_WITHOUT_SPACE: gql`
        mutation addQuestion($question: String!, $user_id: Int!) {
            insert_questions_one(object: { question: $question, user_id: $user_id }) {
                id
                question
                user {
                    id
                    name
                    username
                }
                space {
                    id
                    name
                }
            }
        }
    `,
    ADD_QUESTION_WITH_SPACE: gql`
        mutation addQuestionWithSpace($question: String!, $space_id: Int!, $user_id: Int!) {
            insert_questions_one(object: { question: $question, space_id: $space_id, user_id: $user_id }) {
                id
                question
                space {
                    id
                    name
                }
                user {
                    id
                    name
                    password
                }
            }
        }
    `,
    EDIT_QUESTION: gql`
        mutation editQuestion($question_id: Int!, $question: String!) {
            update_questions_by_pk(pk_columns: { id: $question_id }, _set: { question: $question }) {
                id
                question
                answers {
                    id
                    answer
                }
            }
        }
    `,
};

export default questionMutation;
