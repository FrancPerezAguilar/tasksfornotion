import { ADD_TASK, INIT } from "./types";

export default function (state, action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_TASK:
      return {
        ...state,
      };

    case INIT:
      return {
        ...state,
        taskList: payload,
      };
  }
}
