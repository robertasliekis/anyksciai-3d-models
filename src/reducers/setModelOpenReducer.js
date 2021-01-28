const initialState = {
  modelOpenIndex: null
};

const setModelOpen = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODEL_OPEN":
      return { ...state, modelOpenIndex: action.payload };
    default:
      return state;
  }
};

export default setModelOpen;
