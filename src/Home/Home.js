import React from 'react'; 
import {Link} from 'react-router-dom'
import './Home.css';

const Home = () => {
  document.body.style = "background: black; color: white";

     return (
       <div className="container" style ={{marginTop: "15px"}}>
         <h2 className='display-4'>Welcome to the Last Barbershop</h2>
         <Link to='/schedule' className="btn btn-secondary m-5">
           <span className="material-symbols-outlined">calendar_month</span>
          <span> Schedule An Appointment</span>
         </Link>
       </div>
     );
}
 
export default Home;
