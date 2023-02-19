import React, { useReducer, useEffect } from "react";
import TasksReducer from "./TasksReducer";
import TasksContext from "./TasksContext";

import { getContentDatabase, getTaskList } from "../apis/notion";

import { ADD_TASK, INIT } from "./types";

const TasksState = (props) => {
  const initialState = {
    taskList: [],
    database: getContentDatabase(),
  };

  const [state, dispatch] = useReducer(TasksReducer, initialState);

  useEffect(() => {
    //initialQuery();
  }, []);

  useEffect(() => {
    //console.log(state.taskList);
  });

  const initialQuery = async () => {
    const response = getTaskList();
    dispatch({
      type: INIT,
      payload: (await response).results,
    });
  };

  const addTask = (payload) => {
    var array = state.taskList;
    array.push(payload);
    dispatch({
      type: ADD_TASK,
      payload: array,
    });
  };

  return (
    <TasksContext.Provider
      value={{
        taskList: state.taskList,
        database: state.database,
        addTask,
        initialQuery,
      }}
    >
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksState;
