const initialState = {
  data: []
};

const TaskListReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "GET_TASK_DATA":
      //debugger;
      return { data: actions.data.data, max: actions.data.last_page };
    //debugger;
    //   return newState;

    default:
      return state;
  }
};

export default TaskListReducer;
