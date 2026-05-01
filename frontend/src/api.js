const API = "https://etharaproject-production-75b4.up.railway.app/api";

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

// REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

// TASKS
export const getTasks = async (token) => {
  const res = await fetch(`${API}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const createTask = async (data, token) => {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const updateTask = async (id, data, token) => {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

// USERS
export const getUsers = async (token) => {
  const res = await fetch(`${API}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};