const initialState = {
  data: []
};

const ListReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "USE_DATA":
      //debugger;
      //return state;
      return state;

    case "GET_DATA":
      //debugger;
      return { data: actions.data.data, max: actions.data.last_page };
    //debugger;
    //   return newState;

    default:
      return state;
  }
};

export default ListReducer;
