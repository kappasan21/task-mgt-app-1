import React from 'react';
import TaskList from './TaskList';



export default function TaskManagement(props) {
  const {
    newTask, 
    tasks, 
    remDays,
    handleSubmitTask, 
    handleNewTaskChange,
    handleTaskDelete,
    handleEditTaskClick
  } = props;



  // JSX
  return (
    <div id="task-management-container">

      <form id="task-input-form" onSubmit={handleSubmitTask}>
        <h2>NEW TASK INPUT FORM</h2>
        <label>Task Title: </label>
        <input 
          type='text' 
          name="title" 
          value={newTask.title || ""} 
          onChange={handleNewTaskChange} 
          placeholder="Add a task title" 
        />
        <br />

        <label>Task Details: </label>
        <textarea
          id="task-details"
          type="text" 
          name="details" 
          value={newTask.details || ""} 
          onChange={handleNewTaskChange} 
          placeholder="Add a task details" 
        />
        <br />

        <label>Status</label>
        <select id="status" name="status" value={newTask.status || ""} onChange={handleNewTaskChange}>
          <option value="default" >Select Status below</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Done</option>
        </select>
        <br />

        <label>Priority: </label>
        <select id="priority" name="priority" value={newTask.priority || ""} onChange={handleNewTaskChange}>
          <option value="default" >Select Priority below</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Emergency">Emergency</option>
        </select>
        <br />

        <label>Due Date: </label>
        <input id="due-date" type="date" name="dueDate" value={newTask.dueDate || ""} onChange={handleNewTaskChange} />
        <br />

        <label>Remaining Time: </label>
        <p id="remaining">{newTask.remainingDays || "TBA"}</p>
        <br />

        <button type="submit">Add New Task</button>
      </form>

      <TaskList 
        tasks={tasks}
        remDays={remDays}
        handleTaskDelete={handleTaskDelete}
        handleEditTaskClick={handleEditTaskClick} 
      />

    </div>
  );
}