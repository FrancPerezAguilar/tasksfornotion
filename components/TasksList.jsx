import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Task from "./Task";

import { getTaskList } from "../apis/notion";
const TasksList = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    getTaskList().then((res) => setTasks(res));
  }, []);

  return (
    <ScrollView style={styles.scroll}>
      {tasks === null ? (
        <ActivityIndicator size="small" color="#2383E2" />
      ) : (
        tasks.results.map((task, i) => {
          return <Task key={i} content={task} />;
        })
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
