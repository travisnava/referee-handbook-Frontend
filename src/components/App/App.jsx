import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import { LearningContextProvider } from '../../contexts/learning';
import { AuthContextProvider } from '../../contexts/auth'
import { HomeContextProvider } from '../../contexts/home';

import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import LandingPage from '../LandingPage/LandingPage'
import ProfilePage from '../ProfilePage/ProfilePage'
import Navbar from '../Navbar/Navbar'
import LearningCenterPage from '../LearningCenterPage/LearningCenterPage';
import NotFound from "../NotFound/NotFound"
import Footer from "../Footer/Footer"
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CoursesListPage from '../CoursesListPage/CoursesListPage';
import BeginnerCoursePage from '../BeginnerCoursePage/BeginnerCoursePage';
import HomePage from '../HomePage/HomePage';
import CreateCourseForm from '../CreateCourseForm/CreateCourseForm';
import UserCreatedCoursePage from '../UserCreatedCoursePage/UserCreatedCoursePage'
import TeamPage from '../TeamPage/TeamPage';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Recover from '../Recover/Recover'
import PasswordReset from '../PasswordReset/PasswordReset';


//returns our context providers with our App component nested inside.
export default function AppContainer() {
  return (
    <AuthContextProvider>
      <LearningContextProvider>
        <HomeContextProvider>
          <App />
        </HomeContextProvider>
      </LearningContextProvider>
    </AuthContextProvider>
  )
}

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop>

          <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/recover" element={<Recover/>} />
            <Route path="/password-reset" element={<PasswordReset/>} />
            <Route path="/profile" element={<ProtectedRoute element = {<ProfilePage/>}/>} />
            <Route path="/learning" element={<LearningCenterPage/>} />
            <Route path="/learning/:sportsName" element={<CoursesListPage/>} />
            <Route path="/learning/:sportsName/create" element={<ProtectedRoute element = {<CreateCourseForm/>}/>} />
            <Route path="/learning/:sportsName/beginner" element={<BeginnerCoursePage/>} />
            <Route path="/learning/:sportsName/userCreated/:sportsId" element={<UserCreatedCoursePage/>} />
            <Route path="/sports" element={<HomePage/>}/>
            <Route path="/sports/:sportName/:teamId" element={<TeamPage/>}/>
            <Route path="*" element={<NotFound/>} />
          </Routes>
          <Footer/>
        </ScrollToTop>

      </BrowserRouter>

    </div>
  )
}


