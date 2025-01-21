import React, { useState } from 'react';



export default function TaskList(props) {
  const {tasks, handleTaskDelete, handleEditTaskClick} = props;

  const [listup, setListup] = useState(false);
  console.log(tasks, " in TaskList()");


  // JSX
  return (
    <div id="tasklist-container">
      <h2 id="tasklist-title">TASK LIST</h2>
      <button id="listup-btn" onClick={() => setListup(true)}>List-up Tasks</button>
      <ul id="tasklist">
      {tasks.length < 1 ? 
        <p>No tasks at this moment...</p> 
        : 
        tasks.map((task, id) => 
          <li id="tasklist-task" key={id}>
            <p id="tasklist-task-id">
              <span id="col1">Task ID:</span>
              <span id="col2">{task.id}</span>
            </p>
            <p id="tasklist-task-title">
              <span id="col1">Title:</span>
              <span id="col2">{task.title}</span>
            </p>
            <p id="tasklist-task-description">
              <span id="col1">DESCRIPTION:</span>
              <span id="col2">{task.details}</span>
            </p>
            <p id="tasklist-task-status">
              <span id="col1">STATUS:</span>
              <span id="col2">{task.status}</span>
            </p>
            <p id="tasklist-task-priority">
              <span id="col1">PRIORITY:</span>
              <span id="col2">{task.priority}</span>
            </p>
            <p id="tasklist-task-due">
              <span id="col1">DUE DATE:</span>
              <span id="col2">{task.dueDate}</span>
            </p>
            <p id="tasklist-task-remaining">
              <span id="col1">REMAINING DAYS:</span>
              <span id="col2">{task.remainingDays} days</span>
            </p>
            <button id="tasklist-task-delete-btn" className="tasklist-btn" onClick={() => handleTaskDelete(task.id)}>Delete</button>
            <button id="tasklist-task-edit-btn" className="tasklist-btn" onClick={() => handleEditTaskClick(task.id)}>Edit</button>
          </li>)
      }
      </ul>
      {!listup ?  "" :
        <div id="listup-filter">
        <ul id="tasklist2">
          <button id="closelist-btn" onClick={() => setListup(false)}>Close List</button>
          <li id="tasklist2-titlebar">
            <p>Task ID</p>
            <p>Task Title</p>
            <p>Description</p>
            <p>Status</p>
            <p>Priority</p>
            <p>Due Date</p>
            <p>Remaining Days</p>
            <p>Delete</p>
            <p>Edit</p>
          </li>
          {tasks.map((task, id) => 
            <li id="tasklist2-contents" key={id}>
              <p id="task-list-id">{id + 1}</p>
              <p>{task.title}</p>
              <p>{task.details}</p>
              <p id="task-list-status">{task.status}</p>
              <p id="task-list-priority">{task.priority}</p>
              <p id="task-list-due">{task.dueDate}</p>
              <p id="task-list-remaining">{task.remainingDays}</p>
              <button id="task-delete-btn" onClick={() => handleTaskDelete(task.id)}>X</button>
              <button id="task-edit-btn" onClick={() => handleEditTaskClick(task.id)}>Edit</button>
            </li>
          )}
        </ul>
        </div>
      }
    </div>
  );
}