import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, getUsers } from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // FETCH TASKS
  const fetchTasks = async () => {
    const data = await getTasks(token);
    setTasks(data);
  };

  // FETCH USERS
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  // CREATE TASK (UPDATED)
  const handleCreate = async () => {
    await createTask(
      {
        title,
        description: "New Task",
        assignedTo,
        dueDate,
      },
      token,
    );

    setTitle("");
    fetchTasks();
  };

  // UPDATE TASK
  const handleUpdate = async (id) => {
    await updateTask(id, { status: "completed" }, token);
    fetchTasks();
  };

  // LOAD DATA
  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="header">
        <h2>Task Manager</h2>
        <div>
          <span>Role: {role}</span>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ADMIN CREATE */}
      {role === "admin" && (
        <div className="task-input">
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* USER DROPDOWN */}
          <select onChange={(e) => setAssignedTo(e.target.value)}>
            <option>Select User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* DATE INPUT */}
          <input type="date" onChange={(e) => setDueDate(e.target.value)} />

          <button onClick={handleCreate}>Create Task</button>
        </div>
      )}

      {/* TASK LIST */}
      {tasks.map((task) => {
        const isOverdue =
          task.dueDate &&
          new Date(task.dueDate) < new Date() &&
          task.status !== "completed";

        return (
          <div
            key={task._id}
            className={`task-card ${
              task.status === "completed" ? "completed" : ""
            }`}
          >
            <h4>{task.title}</h4>
            <p>Status: {task.status}</p>

            {/* SHOW USER */}
            <p>Assigned to: {task.assignedTo?.name}</p>

            {/* OVERDUE */}
            {isOverdue && <p style={{ color: "red" }}>Overdue</p>}

            {task.status !== "completed" && (
              <button onClick={() => handleUpdate(task._id)}>
                Mark Completed
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
