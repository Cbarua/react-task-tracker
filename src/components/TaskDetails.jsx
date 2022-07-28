import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import Button from "./Button";

const TaskDetails = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState({});
  //   const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const tasksUrl = "http://localhost:5000/tasks";
      const res = await fetch(`${tasksUrl}/${id}`);

      if (res.status === 404) {
        navigate("/");
      }

      const data = await res.json();
      setTask(data);
      setLoading(false);
    };
    fetchTask();
  });

  //   if (error) {
  //     return <Navigate to={'/'} />
  //   }

  return loading ? (
    <h3>Loading...</h3>
  ) : (
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>
      <Button text={"Go Back"} onClick={() => navigate(-1)} />
    </div>
  );
};

export default TaskDetails;
