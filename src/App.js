import React, { useState, useEffect, useRef } from 'react';
import AppointManagement from './component/AppointManagement';
import TaskManagement from './component/TaskManagement';
import axios from 'axios';

// import { useContext, createContext, useCallback } from 'react';
import { createContext } from 'react';
export const AppointContext = createContext();



function App() {
  // For token authentication function
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenUser, setTokenUser] = useState('');
  // Validate token only once when accessing this web app 
  useEffect(() => {
    // Send a request to validate the token
    axios.post('http://localhost:3111/validate-token', {}, {
      withCredentials: 'include', // instead of true
    })
    .then((response) => {
      console.log("Client received: ", response.data);
      // alert("Logged in successfully");
      setIsAuthenticated(true);
      setTokenUser(response.data.username);
    })
    .catch((error) => {
      console.error("Failed to validate token with the server: ", error);
    });
  }, []);

  function handleBackToLoginClick(e) {
    e.preventDefault();
    
    axios.post('http://localhost:3111/logout', null, {
      withCredentials: true,
    })
    .then((response) => {
      console.log('Log out successfully.', response.data);
      alert('Logged out successfully');
      setIsAuthenticated(false);
      window.location.href = 'http://localhost:3111';
    })
    .catch((err) => {
      console.error('Error logging out: ', err);
      alert('Error logging out: ', err);
    });

    // Clear local storage
    localStorage.clear();
  }

  function handleBackToMenuClick(e) {
    e.preventDefault();
    // Back to App Menu Page
    window.location.href='http://localhost:3111/menu';
  }

  // LOCAL STORAGE CONFIGURATION:
  // JSON.stringify and JSON.parse are MUST!!!!
  // Automatically save before reloading
  window.addEventListener('beforeunload', () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("appointments", JSON.stringify(appointments));
  });
  // Automatically load data from local storage
  window.addEventListener("load", () => {
    let localSavedTasks = JSON.parse(localStorage.getItem("tasks"));
    let localSavedAppointments = JSON.parse(localStorage.getItem("appointments"));
    if(!localSavedTasks) {
      localSavedTasks = [];
      setTasks(localSavedTasks);
    } else {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }

    if(!localSavedAppointments) { 
      localSavedAppointments = [];
      setAppointments(localSavedAppointments);
    } else {
      setAppointments(JSON.parse(localStorage.getItem("appointments")));
    }
  });



  // page determines which app opens now. 1 = task management app, 2 = appointments app
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState([]);

  // Page Control
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };



  // Task Management
  const [newTask, setNewTask] = useState({});
  // FUNCTION: get use input
  const handleNewTaskChange = (e) => {
    // This is a special case, and define with let but not const here.
    const {name, value} = e.target;
    
    setNewTask((prev) => ({...prev, id: Date.now(), [name]: value}));
    console.log(name, ", ", value, " in handleNewTaskChange");
  };

  // Manage remaining days until the due
  // const [remDays, setRemDays] = useState('');
  // Calculate the remaining days
  const calculateRemDays = (dueDate) => {
    console.log("Check point in calculateRemDays");
    const dueDateObj = new Date(dueDate);
    const today = new Date();
    const diffTime = Math.abs(dueDateObj - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // setRemDays(diffDays);
    return diffDays;
  };


  // Declare useRef to scroll to the location of the newly added item
  const taskSubmitRef = useRef(null);
  // Submit the current task
  const handleSubmitTask = (e) => {
    e.preventDefault();
    
    taskSubmitRef.current.scrollIntoView({ behavior: "smooth" });

    // Calculate remaining days based on the due date and insert it to newTask info.
    console.log("newTask before submit task: ", newTask);
    const tempNewTask = newTask;
    if(newTask.dueDate) {
      const result = calculateRemDays(newTask.dueDate);
      tempNewTask.remainingDays = result;
      console.log("newTask about to submit: ", tempNewTask);
      setTasks((prev) => [...prev, tempNewTask]);
    } else {
      tempNewTask.remainingDays = "TBA";
      console.log("newTask about to submit: ", tempNewTask);
      setTasks((prev) => [...prev, tempNewTask]);
    }

    setNewTask({});
  };

  const handleTaskDelete = (targetId) => {
    setTasks(tasks.filter((task) => task.id !== targetId));
  };


  // Declare useRef to scroll to the position of Input Form
  const modifyFirmRef = useRef(null);
  // Edit the task info in task list
  const handleEditTaskClick = (targetId) => {
    modifyFirmRef.current.scrollIntoView({ behavior: "smooth"});
    console.log("targetId of task you clicked is: ", targetId);
    const targetTask = tasks.find((task) => task.id === targetId);
    console.log("Found the target! ", targetTask);
    if(!targetTask) {
      // This shouldn't occur as normal.  So, this case is an error case.
      console.error("Couldn't find the target task for some error...");
      return;
    }
    // Display the task found in the form
    setNewTask(targetTask);
    // Delete the duplicate in the task array
    setTasks(tasks.filter((task) => task.id !== targetTask.id));
  };





  // Handle Appointments
  const [appointment, setAppointment] = useState({});
  const [appointments, setAppointments] = useState([]);


  function handleNewAppointChange(e) {
    const {name, value} = e.target;
    setAppointment((prev) => ({...prev, id: Date.now(), [name]: value}));
    console.log(name, " : ", value);
  }

  function handleAppointSubmit(e) {
    e.preventDefault();


    const startTime = new Date(appointment.start)
    const endTime = new Date(appointment.end);
    console.log("Start time: ", startTime, ", End time: ", endTime);
    // setAppointments((prev) => [...prev, appointment]);
    if (appointment.start && appointment.end && new Date(appointment.start) <= new Date(appointment.end)) {
      setAppointments([
        ...appointments,
        {
          ...appointment,
          start: startTime,
          end: endTime,
        },
      ]);
    } else {
      alert("Invalid event time range! Start time must be before end time.");
    }
    setAppointment({});
  }

  function handleAppointDelete(targetId) {
    setAppointments(appointments.filter((item) => item.id !== targetId));
  }

  


  // JSX
  return (
    <div id="App-body">
      // {!isAuthenticated ? 
      //   <div>
      //     <p>The authentication token has been expired...</p>
      //     <p>Please login again.</p>
      //     <button style={{width: "50%", margin: "0 auto"}} onClick={handleBackToLoginClick}>Back to Login Page</button>
      //   </div>
      //   :
        <div className="App" ref={modifyFirmRef}>
          <div id="App-header">
            <div id="App-header-left">
              <button className="menu-btn" onClick={handleBackToMenuClick}>Back To Menu</button>
              <button className="logout-btn" onClick={handleBackToLoginClick}>Logout</button>
            </div>
            {page===1 ? 
              <div id="App-header-center">
                <h1 id="main-title">Task Management App</h1>
                <p id="main-second-title" onClick={() => handlePageClick(2)}>Appointment Management App</p>
              </div> 
              :
            page===2 ? 
              <div id="App-header-center">
                <h1 id="main-title">Appointment Management App</h1>
                <p id="main-second-title" onClick={() => handlePageClick(1)}>Task Management App</p> 
              </div>
              : 
            <p>Error</p>}
            <div id="App-header-right">
              <p><span id="col1">USER:</span><span id="col2">{tokenUser}</span></p>
            </div>
          </div>

          <div id="App-main">
            {page === 1 ? 
              <TaskManagement 
                newTask={newTask}
                tasks={tasks} 
                handleSubmitTask={handleSubmitTask}
                handleNewTaskChange={handleNewTaskChange}
                handleTaskDelete={handleTaskDelete}
                handleEditTaskClick={handleEditTaskClick}
              /> 
              : 
              null}

            {page === 2 ? 
              <AppointContext.Provider value={handleAppointDelete}>
                <AppointManagement 
                  appointment={appointment}
                  appointments={appointments} 
                  handleNewAppointChange={handleNewAppointChange}
                  handleAppointSubmit={handleAppointSubmit}
                  handleAppointDelete={handleAppointDelete}
                /> 
              </AppointContext.Provider>
              : 
              null}
          </div>

          <div id="App-footer" ref={taskSubmitRef}>
            <div id="footer-left-container">
            </div>

            <div id="footer-center-container">
              <p id="company-logo">🍊Mikan Corp.</p>
            </div>
            
            <div id="footer-right-container">
              <p>Contacts:</p>
              <p>mikan@mikan.com</p>
              <p>somewhere in Germany</p>
            </div>
          </div>
        </div>
      // }
    </div>
  );
}

export default App;
