import React, {useState} from 'react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

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
         <DatePicker
           viewDate={viewDate}
           handleDecrease={handleDecrease}
           handleIncrease={handleIncrease}
           handleMonthSelect={handleMonthSelect}
           handleDayClick={handleDayClick}
           month={month}
         />
         {hoursActive?  <TimePicker dateSelected={dateSelected}/>: null}
       </>
     );
}
 
export default DateTimePicker;