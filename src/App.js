/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { useState, useEffect } from "react";
import Checkbox from "./components/checkbox";

// [
//   'walk buster',
//   'brush teeth'
// ]

// JSON.stringify(array) -> "['walk buster', 'brush teeth']"

// {
//   'key': 'value'
// }

function App() {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("completed")) || []
  );

  // everytime we update tasks, save it the browser
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  function insertTask(e) {
    if (name === "") {
      alert("You must enter a task");
    } else {
      setTasks([...tasks, name]);
      setName("");
    }
  }

  function clearAll(e) {
    setTasks([]);
    setCompleted([]);
  }

  function markDone(e) {
    let taskName = e.target.name;
    let new_tasks = [...tasks];
    new_tasks = new_tasks.filter((task) => taskName !== task);
    setTasks(new_tasks);
    setCompleted([...completed, taskName]);
  }
  function moveBack(e) {
    let taskName = e.target.name;
    let new_tasks = [...completed];
    new_tasks = new_tasks.filter((task) => taskName !== task);
    setCompleted(new_tasks);
    setTasks([...tasks, taskName]);
  }

  //update tasks state -> change later
  function insertName(e) {
    if (e.key === "Enter") {
      insertTask();
    } else {
      setName(e.target.value);
    }
  }

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>To Do List</h2>
      <div className="row">
        <div className="col s12">
          <div className="input-field">
            <input
              id="email_inline"
              className="validate"
              type="text"
              value={name}
              onChange={insertName}
              onKeyDown={insertName}
            />
            <label htmlFor="email_inline">add task</label>
          </div>
          <a
            onClick={insertTask}
            style={{ marginRight: 10, backgroundColor: 'grey' }}
            className="waves-effect waves-light btn"
          >
            Add
          </a>
          <a onClick={clearAll} style={{backgroundColor: 'grey'}} className="waves-effect waves-light btn">
            Clear all
          </a>
        </div>
        <div className="col s6">
          <h3>To Do:</h3>
          {tasks.map((i) => (
            <Checkbox markDone={markDone} isChecked={false} task={i} />
          ))}
        </div>
        <div className="col s6">
          <h3>Done:</h3>
          {completed.map((i) => (
            <Checkbox markDone={moveBack} isChecked={true} task={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
