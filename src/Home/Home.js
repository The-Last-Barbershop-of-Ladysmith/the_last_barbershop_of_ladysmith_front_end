import React from 'react';
import { Link } from 'react-router-dom'
import logo from "../Pictures/logo.png"
import './Home.css';
import { motion } from "framer-motion"

const Home = () => {

  // Welcome sign with fade animation using framer-motion library
  const welcomePrompt = (
    <motion.div
      className='welcome'
      initial={{ opacity: 2, zIndex: 2 }}
      animate={{
        opacity: 0, transitionEnd: { zIndex: -1 }
      }}
      transition={{ duration: 2, delay:2 }}
    >
      <motion.img 
        animate={{
          opacity: 0, transitionEnd: { zIndex: -1 }
        }}
        transition={{ duration: 2 }}
        src={logo} 
        alt="The Last Barbershop" />
      <motion.h2 
      animate={{
        opacity: 0, transitionEnd: { zIndex: -1 }
      }}
      transition={{ duration: 2 }}
      className='display-4'>Welcome to the Last Barbershop</motion.h2>
    </motion.div>
  )

  //Main home screen to view nav and schedule button
  const mainScreen = (
    <div className='mainScreen'>
      <div className='blur'>
        <h2 className='display-3'>The Last Barbershop of Ladysmith, VA</h2>
        <h3>Haircuts, and styles for the whole family</h3>
        <Link to='/schedule' className="scheduleBtn btn  m-5 richBlack justify-self-end">
          <span className="material-symbols-outlined">calendar_month</span>
          <span> Schedule An Appointment</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {mainScreen}
      {welcomePrompt}
    </>
  )
}

export default Home;
