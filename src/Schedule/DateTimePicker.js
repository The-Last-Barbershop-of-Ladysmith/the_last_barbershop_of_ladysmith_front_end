import React, {useState} from 'react';
import Calendar from './Calendar';
import HourPicker from './HourPicker';

const DateTimePicker = () => {
     const [viewDate, setViewDate] = useState(new Date());
     const[dateSelected, setDateSelected] = useState(viewDate)
     const[hoursActive, setHoursActive] =useState(false)
     const month = viewDate.getMonth();

       const handleIncrease = () => {
          setHoursActive(false)
         const d = new Date();
         d.setMonth(month + 1);
         d.setDate(1);
         setViewDate(d);
         setDateSelected(viewDate);
       };
       const handleDecrease = () => {
          setHoursActive(false)
         const d = new Date();
         d.setMonth(month - 1);
         d.setDate(1);
         setViewDate(d)
         setDateSelected(viewDate);
       };
       const handleMonthSelect =() => {
          setHoursActive(false)
          setViewDate(new Date());
       }
       const handleDayClick = (day) => {
          setHoursActive(true)
          const d = new Date()
          d.setMonth(month)
          d.setDate(day)
          setDateSelected(d);
          console.log( d, viewDate)
       }
     return (
       <>
         <Calendar
           viewDate={viewDate}
           handleDecrease={handleDecrease}
           handleIncrease={handleIncrease}
           handleMonthSelect={handleMonthSelect}
           handleDayClick={handleDayClick}
           month={month}
         />
         {hoursActive?  <HourPicker dateSelected={dateSelected}/>: null}
       </>
     );
}
 
export default DateTimePicker;