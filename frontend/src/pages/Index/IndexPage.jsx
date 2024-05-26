import React from 'react'
import { useUser } from '../../hook/useUser'
import { Navigate } from 'react-router-dom';
import './IndexPage.css'
const IndexPage = () => {
  const {loading, userData} = useUser();
  
  if (loading) {
    return (
      <div class="preloader">
        <div class="preloader__ring">

          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
          <div class="preloader__sector"></div>
        </div>
      <div class="preloader__text">Loading...</div>
      <div class="preloader__bar"></div>
    </div>
    )
  }
  if (!userData) {
    return <Navigate to='/signin' />
  }

  if (userData) {
    return <Navigate to='/profile/dashboard' />
  }
}

export default IndexPage
