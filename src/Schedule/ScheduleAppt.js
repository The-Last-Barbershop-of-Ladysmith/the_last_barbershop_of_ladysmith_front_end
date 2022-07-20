import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Header from '../Header/Header'
import ClientNumber from './ClientNumber'

const Schedule = () => {
const [clientNumber, setClientNumber] = useState(1);
const navigate = useNavigate()

const handleSubmit = (event) => {
     event.preventDefault()
     setClientNumber(document.forms[0].numOfClients.value)
     navigate('/schedule/date-selection')
}
console.log(clientNumber);
     return (  
          <>
          <ClientNumber handleSubmit={handleSubmit} clientNumber = {clientNumber}/>
          </>
     );
}
 
export default Schedule;