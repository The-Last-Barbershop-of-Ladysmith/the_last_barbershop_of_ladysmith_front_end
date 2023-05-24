import React from 'react';

const Review = ({formData}) => {
    return ( 
    <div>
        <h3>Review Appointment Details</h3>
        {Object.keys(formData).map((key,i) => (
            <p>{key} : {formData[key]}</p>
        ))}
    </div> 
    );
}
 
export default Review;