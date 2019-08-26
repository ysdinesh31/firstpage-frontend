import axios from "axios";

export const services = {
  login,
  register,
  forgotPassword,
  resetPassword,
  profile,
  addTask,
  deleteTask,
  updateTask,
  taskList,
  deleteUser,
  changeUserRole,
  userList
};

function login(credentials) {
  return axios.post("http://localhost:8000/login/checklogin", credentials, {
    withCredentials: true
  });
}

function register(details) {
  return axios.post("http://localhost:8000/login/register", details, {
    withCredentials: true
  });
}

function forgotPassword(details) {
  return axios.post("http://localhost:8000/login/forgot", details, {
    withCredentials: true
  });
}

function resetPassword(details) {
  return axios.post("http://localhost:8000/login/reset", details, {
    withCredentials: true
  });
}

function profile() {
  return axios.post("http://localhost:8000/login/profile", null, {
    withCredentials: true
  });
}

function addTask(details) {
  return axios.post("http://localhost:8000/login/addtask", details, {
    withCredentials: true
  });
}

function deleteTask(id) {
  return axios.post(
    "http://localhost:8000/login/deletetask",
    { id: id },
    {
      withCredentials: true
    }
  );
}

function updateTask(details, id) {
  return axios.post(
    "http://localhost:8000/login/updatetask",
    {
      title: details.title,
      description: details.description,
      id: id,
      due_date: details.due_date,
      status: details.status
    },
    {
      withCredentials: true
    }
  );
}

function taskList(details) {
  return axios.post("http://localhost:8000/login/tasklist", details, {
    withCredentials: true
  });
}

function deleteUser(id) {
  return axios.post(
    "http://localhost:8000/login/delete",
    { id: id },
    {
      withCredentials: true
    }
  );
}

function changeUserRole(id) {
  return axios.post(
    "http://localhost:8000/login/changerole",
    { id: id },
    {
      withCredentials: true
    }
  );
}

function userList(details) {
  return axios.post("http://localhost:8000/login/userlist", details, {
    withCredentials: true
  });
}

export * from "./services";
