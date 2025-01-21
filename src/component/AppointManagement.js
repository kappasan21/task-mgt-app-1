import React from 'react';
import CalendarSection from './CalendarSection';

import ReportIcon from '@mui/icons-material/Report';


export default function AppointManagement(props) {
  const { appointment, appointments, handleNewAppointChange, handleAppointSubmit, handleAppointDelete } = props;


   
  // JSX
  return (
    <div id="appoint-mgt-container">
      <div id="appoint-mgt-msg-container">
        <p id="appoint-mgt-msg"><ReportIcon id="report-icon"/> {props.appointments.length} appointments scheduled for now.</p>
        {/* <p>Click on an appointment to view or edit details.</p> */}
      </div>

      <form id="appoint-input-form" onSubmit={handleAppointSubmit}>
        <h2>Booking Form</h2>
        <label>Requester's Name</label>
        <input 
          type="text" 
          name="name" 
          value={appointment.name || ""} 
          placeholder="Requester Name" 
          onChange={handleNewAppointChange} 
        />
        <br/>
        <label>Appointment Summary</label>
        <input 
          type="text" 
          name="title" 
          placeholder="Appointment Title" 
          onChange={handleNewAppointChange} 
          value={appointment.title || ""} 
        />
        <br/>
        <label>Start Date and Time</label>
        <input 
          type="datetime-local" 
          name="start" 
          value={appointment.start || ""} 
          onChange={handleNewAppointChange} 
        />
        <br />
        <label>End Date and Time</label>
        <input 
          type="datetime-local"
          name="end"
          value={appointment.end || ""}
          onChange={handleNewAppointChange}
        />
        <br/>
        <button onClick={props.handleAddAppointment}>Add Appointment</button>
      </form>
      <hr />

      <CalendarSection appoints={appointments}/>
      <hr />

      {/* Render appointments */}
      <div id="appoint-list-container">
        <h2>Appointment List</h2>
        {props.appointments.map((item, index) => (
          <div key={index} className="appointment-card">
            <h3>
              <span id="col1">Appointer:</span>
              <span id="col2">{item.name}</span>
            </h3>
            <p>
              <span id="col1">Brief Summary:</span>
              <span id="col2">{item.title}</span>
            </p>
            <p>
              <span id="col1">Start Date&Time:</span>
              <span id="col2">{item.start.toLocaleString()}</span>
            </p>
            <p>
              <span id="col1">End Date&Time:</span>
              <span id="col2">{item.end.toLocaleString()}</span>
            </p>
            <button onClick={() => handleAppointDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}