// function components don't need to import 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import TaskDetails from "./components/TaskDetails";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const tasksUrl = 'http://localhost:5000/tasks';

  // #3
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, [])

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(tasksUrl);
    const data = await res.json();
    return data;
  }

  // fetch a task
  const fetchTask = async (id) => {
    const res = await fetch(`${tasksUrl}/${id}`);
    const data = await res.json();
    return data;
  }

  // add task
  const addTask = async (task) => {
    const res = await fetch(tasksUrl, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const data = await res.json();

    setTasks([...tasks, data]);

    // #4
    // const id = Math.floor(Math.random * 10000) + 4;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`${tasksUrl}/${id}`, { method: 'delete' });
    setTasks(tasks.filter(task => task.id !== id));
  }

  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`${tasksUrl}/${id}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });
    const data = await res.json();

    setTasks(tasks.map(
      task => task.id === id ?
        { ...task, reminder: data.reminder }
        : task
    ));
  }
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route path="/" element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ?
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                /> : 'No tasks to show'}
            </>
          }
          />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
