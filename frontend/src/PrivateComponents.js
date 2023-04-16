import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateComponents = ({children}) => {
    // checking if user is logged in or not
    const isAuthenticated = localStorage.getItem('xVSC#520');
  return (
    isAuthenticated? children:<Navigate to="/login"/>
  )
}
