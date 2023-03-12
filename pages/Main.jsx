import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { FAB } from "@rneui/themed";

import TasksList from "../components/TasksList";
import TasksContext from "../contexts/TasksContext";

const Main = ({ navigation }) => {
  const { initialQuery } = useContext(TasksContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialQuery();
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      setLoading(true);
      setTimeout(() => {
        //getTaskList().then((res) => setTasks(res));
        setLoading(false);
      }, 1000);
    });
  }, [navigation]);

  return (
    <>
      {!loading ? (
        <>
          <TasksList />
          <FAB
            icon={{ name: "add", color: "white" }}
            color="#2383E2"
            placement="right"
            style={styles.fab}
            title="New task"
            onPress={() => navigation.navigate("New task")}
          />
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator style={styles.activityIndicator} size={"large"} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  avatar: {
    backgroundColor: "#d0d0d0",
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  divider: {
    height: 2,
    backgroundColor: "#3C3C3C",
    marginHorizontal: 16,
  },
  fab: {
    marginBottom: "10%",
  },
  activityIndicator: {
    paddingVertical: 25,
  },
});

export default Main;

/*
    <View style={styles.header}>
        <Text style={{ fontSize: 25 }}>
          {database === null ? "Loading..." : database.title[0].plain_text}
        </Text>
        <View style={styles.avatar} />
      </View>
    <View style={styles.divider}></View>
*/
