import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginRegister } from './components/LoginRegister/login-register'
import { PrivateRouter } from './privateRoutes'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/PageNotFound/PageNotFound'

export const Router = () => {
  // checking if user is logged in or not
  const isAuthenticated = localStorage.getItem("xVSC#520");
  return (
    <Routes>
      <Route path = "/" element={<PrivateRouter><Home/></PrivateRouter>}/>
      <Route path="/login" element={isAuthenticated?<Navigate to="/"/>:<LoginRegister route="SignIn"/>} />
      <Route path="/register" element={isAuthenticated?<Navigate to="/"/>:<LoginRegister route="SignUp" />} />
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
}
