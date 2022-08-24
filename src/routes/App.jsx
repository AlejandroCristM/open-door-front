import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../containers/Layout';
import Course from '../pages/Course';
import CourseList from '../pages/CourseList';
import Home from '../pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/courses' element={<CourseList/>} />
          <Route path='/course/:courseId' element={<Course />} />
          <Route path='*' element={<p>There is nothing here: 404!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
