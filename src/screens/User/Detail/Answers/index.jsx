import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Answer from "../../../../Components/Answer";
import LineSeparator from "../../../../Components/LineSeparator";
import { useParams } from "react-router-dom";

import { useLazyQuery } from "@apollo/client";
import answerQuery from "../../../../GraphQL/answer/query";

const UserAnswers = () => {
    const { username } = useParams();

    const { GET_ANSWERS_BY_USERNAME } = answerQuery;

    const [getAnswersByUsername, { data: answers, loading, error }] = useLazyQuery(GET_ANSWERS_BY_USERNAME);

    useEffect(() => {
        getAnswersByUsername({
            variables: {
                username,
            },
        });
    }, []);

    return (
        <Box>
            {answers?.answers.map((answer, idx) => {
                const { id: answerId, downvote_count, upvote_count } = answer;
                const { id: questionId, question } = answer.question;
                const { id: userId, name, username, profile_picture } = answer.user;
                return (
                    <React.Fragment key={answerId}>
                        <Box my={4}>
                            <Answer
                                key={answerId}
                                name={name}
                                username={username}
                                questionId={questionId}
                                question={question}
                                answer={answer.answer}
                                profilePicture={profile_picture}
                                upvoteCount={upvote_count}
                                downvoteCount={downvote_count}
                                showQuestion={true}
                                canClickLinkProfile={false}
                            />
                        </Box>
                        {idx !== answers.answers.length - 1 && <LineSeparator />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default UserAnswers;
