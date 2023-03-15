import React, { useReducer, useEffect } from "react";
import TasksReducer from "./TasksReducer";
import TasksContext from "./TasksContext";

import {
  getContentDatabase,
  getTaskList,
  createTask,
  updateTask,
} from "../apis/notion";

import { ADD_TASK, INIT, PACTH_TASK, RELOAD_TASKS } from "./types";

const TasksState = (props) => {
  const initialState = {
    taskList: [],
    database: {},
  };

  const [state, dispatch] = useReducer(TasksReducer, initialState);

  const initialQuery = async () => {
    const response_tasks = getTaskList();
    const response_db = getContentDatabase();
    dispatch({
      type: INIT,
      payload: {
        tasks: (await response_tasks).results,
        database: await response_db,
      },
    });
  };

  const reloadTasks = async () => {
    return await getTaskList().then((res) => {
      dispatch({
        type: RELOAD_TASKS,
        payload: res.results,
      });
      return res;
    });
  };

  const addTask = async (payload) => {
    await createTask(payload).then((res) => {
      return getTaskList().then((res) => {
        dispatch({
          type: ADD_TASK,
          payload: res.results,
        });
        return res;
      });
    });
  };

  const patchTask = async (pageID, obj) => {
    updateTask(pageID, obj).then((res) => {
      /**
       * reloadTasks().then(() => {
        return res;
      });
       */
      return res;
    });
  };

  const getTags = () => {
    return state.database.properties.Tags.multi_select.options;
  };

  const getReminders = () => {
    return null;
  };

  return (
    <TasksContext.Provider
      value={{
        taskList: state.taskList,
        database: state.database,
        addTask,
        patchTask,
        initialQuery,
        reloadTasks,
        getTags,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
