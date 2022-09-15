import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Layout from '../containers/Layout';
import Course from '../pages/Course';
import CourseList from '../pages/CourseList';
import Home from '../pages/Home';
import NotFounded from '../pages/NotFounded';
import UserProfile from '../pages/UserProfile';
import LoginFirst from '../pages/LoginFirst';
import Loading from '../components/atoms/Loading';
import Tracking from '../pages/Tracking';

function App() {

  const { isLoading, isAuthenticated} = useAuth0();

  if (isLoading) {
    return (
      <Loading/>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/profile' 
            element={isAuthenticated ? 
              <UserProfile /> 
              :
              <LoginFirst />
            }
          />
          <Route path='/courses' 
            element={isAuthenticated ? 
              <CourseList /> 
              :
              <LoginFirst />
            }
          />
          <Route path='/course/:courseId' 
            element={isAuthenticated ? 
              <Course /> 
              :
              <LoginFirst />
            }
          />
          <Route path='/tracking' 
            element={isAuthenticated ? 
              <Tracking /> 
              :
              <LoginFirst />
            }
          />
          <Route path='*' element={<NotFounded/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
