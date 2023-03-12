import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  RefreshControl,
  Image,
} from "react-native";
import Task from "./Task";

import TasksContext from "../contexts/TasksContext";

const TasksList = () => {
  const { taskList, reloadTasks } = useContext(TasksContext);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (taskList !== undefined && loading) {
      setLoading(false);
    }
  }, [taskList]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reloadTasks().then((res) => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {taskList.length !== 0 ? (
        <>
          <Text style={styles.text}>Tasks</Text>
          {!loading ? (
            taskList.map((task, i) => {
              return <Task key={i} content={task} />;
            })
          ) : (
            <ActivityIndicator
              color="#2383E2"
              style={styles.activityIndicator}
            />
          )}
        </>
      ) : (
        <View style={styles.noTasks}>
          <Image
            style={styles.image}
            source={require("../assets/no-tasks.png")}
          />
          <Text>That's it!</Text>
        </View>
      )}
    </ScrollView>
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
  image: {
    width: 250,
    height: 250,
  },
  activityIndicator: {
    paddingVertical: 25,
  },
});

export default TasksList;
