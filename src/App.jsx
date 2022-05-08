import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import Space from "./screens/Space";
import QuestionDetail from "./screens/Question/Detail";
import User from "./screens/User/Detail";
import UserQuestions from "./screens/User/Detail/Questions";
import UserAnswers from "./screens/User/Detail/Answers";
import QuestionScreen from "./screens/Question";
import SpaceDetail from "./screens/Space/Detail";
import SpaceAnswers from "./screens/Space/Detail/Answers";
import SpaceQuestions from "./screens/Space/Detail/Questions";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/question">
                <Route index element={<QuestionScreen />} />
                <Route path=":questionId" element={<QuestionDetail />} />
            </Route>
            <Route path="/user">
                <Route index element={<Navigate to="/" replace />} />
                <Route path=":username" element={<User />}>
                    <Route path="answers" element={<UserAnswers />} />
                    <Route path="questions" element={<UserQuestions />} />
                </Route>
            </Route>
            <Route path="/space">
                <Route element={<Space />} index />
                <Route path=":spaceId" element={<SpaceDetail />}>
                    <Route path="answers" element={<SpaceAnswers />} />
                    <Route path="questions" element={<SpaceQuestions />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;
