export const getTaskData = data => {
  return { type: "GET_TASK_DATA", data };
};

export const getUserData = data => {
  return { type: "GET_DATA", data };
};

export const userProfile = data => {
  return { type: "USER_PROFILE", data };
};

export const logout = () => {
  return { type: "LOGOUT" };
};

export const login = () => {
  return { type: "LOGIN" };
};

export * from "./actions";
