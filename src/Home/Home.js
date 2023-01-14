import React from 'react';
import { Link } from 'react-router-dom'
import logo from "../Pictures/logo.png"
import './Home.css';
import { motion } from "framer-motion"

const Home = () => {
  const welcomePrompt = (
    <motion.div className='welcome' initial={{ opacity: 2, zIndex: 2 }} animate={{
      opacity: 0, transitionEnd: { zIndex: -1 }
    }} transition={{ duration: 1.5 }}>

      <img src={logo} alt="The Last Barbershop" />
      <h2 className='display-4'>Welcome to the Last Barbershop</h2>
      

    </motion.div>
  )
  const mainScreen = (
    <div className='mainScreen '>
      <div className='blur d-flex flex-column justify-content-center'>
      <h2 className='display-3'>The Last Barbershop of Ladysmith, VA</h2>
      <h3>Haircuts, and styles for the whole family</h3>
      <Link to='/schedule' className=" scheduleBtn btn btn-secondary m-5 justify-self-end">
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
