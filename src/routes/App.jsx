import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "../containers/Layout";
import Course from "../pages/Course";
import CourseList from "../pages/CourseList";
import Home from "../pages/Home";
import NotFounded from "../pages/NotFounded";
import UserProfile from "../pages/UserProfile";
import LoginFirst from "../pages/LoginFirst";
import Loading from "../components/atoms/Loading";
import Tracking from "../pages/Tracking";
import { useUserState } from "../hooks/useUserState";
import UserDataNotFounded from "../pages/UserDataNotFounded";

function App() {
  const { isAuthenticated, userCreated } = useUserState();
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {isAuthenticated ? (
            userCreated ? (
              <>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/course/:courseId" element={<Course />} />
                <Route path="/tracking/" element={<Tracking />} />
              </>
            ) : (
              <>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/courses" element={<UserDataNotFounded />} />
                <Route path="/course/:courseId" element={<UserDataNotFounded />} />
                <Route path="/tracking/" element={<UserDataNotFounded />} />
              </>
            )
          ) : (
            <>
              <Route path="/profile" element={<LoginFirst />} />
              <Route path="/courses" element={<LoginFirst />} />
              <Route path="/course/:courseId" element={<LoginFirst />} />
              <Route path="/tracking/" element={<LoginFirst />} />
            </>
          )}
          <Route path="*" element={<NotFounded />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
