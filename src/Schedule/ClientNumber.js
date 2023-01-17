import React from 'react';

const ClientNumber = ({formData, handleSubmit, handleChange}) => {

     return (  
          <form onSubmit={handleSubmit}>
               <label htmlFor='numOfClients' className='form-label m-2'>Enter the Number of Cuts to be Scheduled</label>
               <div className="row d-flex justify-content-center">
               <input type="number" id='numOfClients' className='form-control m-2 text-center' value={formData.numOfClients} onChange={handleChange}/>
               </div>
               <button type="Submit" className='btn btn-secondary m-2'>Submit</button>
          </form>
     );
}
 
export default ClientNumber