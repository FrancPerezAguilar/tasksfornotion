import { ADD_TASK, INIT, PACTH_TASK, RELOAD_TASKS } from "./types";

export default function (state, action) {
  const { payload, type } = action;

  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        taskList: payload,
      };

    case INIT:
      return {
        ...state,
        taskList: payload.tasks,
        database: payload.database,
      };

    case PACTH_TASK:
      return {
        ...state,
        taskList: payload,
      };

    case RELOAD_TASKS:
      return {
        ...state,
        taskList: payload,
      };
  }
}
