import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TouchableHighlight,
} from "react-native";
import Task from "./Task";

import TasksContext from "../contexts/TasksContext";

const TasksList = () => {
  const { taskList } = useContext(TasksContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (taskList !== undefined && loading) {
      setLoading(false);
    }
  }, [taskList]);

  return (
    <>
      {taskList.length !== 0 ? (
        <>
          <ScrollView style={styles.scroll}>
            <Text style={styles.text}>Tasks</Text>
            {!loading ? (
              taskList.map((task, i) => {
                if (task.properties.Done.checkbox) {
                  return null;
                }
                return <Task key={i} content={task} />;
              })
            ) : (
              <ActivityIndicator color="#2383E2" />
            )}
            <Text style={styles.text}>Completed</Text>
            {!loading ? (
              taskList.map((task, i) => {
                if (!task.properties.Done.checkbox) {
                  return null;
                }
                return <Task key={i} content={task} />;
              })
            ) : (
              <ActivityIndicator color="#2383E2" />
            )}
          </ScrollView>
        </>
      ) : (
        <View style={styles.noTasks}>
          <Text>No tasks yet...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  noTasks: {
    paddingHorizontal: 16,
    marginVertical: 16,
    display: "flex",
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    fontWeight: "700",
    fontSize: 18,
  },
});

export default TasksList;
