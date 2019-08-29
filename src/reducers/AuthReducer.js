let bool = document.cookie !== "" ? true : false;
const initialState = {
  Name: "",
  Email: "",
  Role: "",
  id: "",
  Created_at: "",
  Created_by: "",
  loggedIn: bool
};

const AuthReducer = (state = initialState, actions) => {
  let newState = { ...state };
  switch (actions.type) {
    case "LOGIN":
      newState.loggedIn = true;
      return newState;

    case "LOGOUT":
      newState.loggedIn = false;
      return newState;

    case "GET_PROFILE":
      return state;

    case "USER_PROFILE":
      newState.Name = actions.data.user.name;
      newState.Email = actions.data.user.email;
      newState.Role = actions.data.user.role;
      newState.id = actions.data.user.id;
      return newState;

    default:
      return state;
  }
};

export default AuthReducer;

//state.Name = actions.data.name;
