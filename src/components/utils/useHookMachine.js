import { useState } from "react";

const useFSM = (initialState, trantisions) => {
  const [state, setState] = useState(initialState);

  const dispatch = (actionName, context = {}, ...arg) => {
    const actions = trantisions[state];
    const action = actions?.[actionName];

    if (action) {
      action({ setState, dispatch, ...context }, ...arg);
    } else {
      console.warn(`Action ${action} not allowed in state ${state} `);
    }
  };

  return [state, dispatch];
};

export default useFSM;
