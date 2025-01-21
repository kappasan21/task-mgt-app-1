import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { useContext } from 'react';
import { AppointContext } from '../App.js';


// configure localizer
const  localizer = momentLocalizer(moment);

export default function CalendarSection(props) {
  const { appoints } = props;
  
  // useContext testing!!! 
  const context = useContext(AppointContext);



  // JSX
  return (
    <div style={{ height: '50vh', margin: '20px' }}>
      <Calendar
        localizer={localizer}
        events={appoints}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
        // style={{ height: 500 }}
      />
    </div>
  );
}