import React, { useEffect, useState, useContext } from "react";
import { Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Task from "./Task";

import TasksContext from "../contexts/TasksContext";
import { getTaskList } from "../apis/notion";
const TasksList = () => {
  const { taskList } = useContext(TasksContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //console.log(taskList);
    if (taskList !== undefined) {
      setLoading(false);
    }
  }, [taskList]);

  return (
    <ScrollView style={styles.scroll}>
      {!loading ? (
        taskList.map((task, i) => {
          return <Task key={i} content={task} />;
        })
      ) : (
        <ActivityIndicator color="#2383E2" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
});

export default TasksList;
