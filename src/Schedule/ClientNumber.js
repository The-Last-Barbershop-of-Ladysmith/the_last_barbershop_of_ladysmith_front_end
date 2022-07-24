import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

const ClientNumber = () => {
document.body.style = "background: black; color: white";
const [clientNumber, setClientNumber] = useState(1);
const [formData, setFormData] = useState({ numOfClients: 1 });
const navigate = useNavigate();

const handleSubmit = (event) => {
  event.preventDefault();
  setClientNumber(document.forms[0].numOfClients.value);
  navigate("/schedule/date-selection");
};
     
     const handleChange = ({target}) =>{
          setFormData({
               ...formData, 
               [target.id]: target.value
          })
     }
     return (  
          <form onSubmit={handleSubmit}>
               <label htmlFor='numOfClients' className='form-label m-2'>Enter the Number of Cuts to be Scheduled</label>
               <div class="row d-flex justify-content-center">
               <input type="number" id='numOfClients' className='form-control m-2 text-center' value={formData.numOfClients} onChange={handleChange}/>
               </div>
               <button type="Submit" className='btn btn-secondary m-2'>Submit</button>
          </form>
     );
}
 
export default ClientNumber