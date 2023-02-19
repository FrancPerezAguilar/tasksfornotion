import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { getContentDatabase, getTaskList } from "../apis/notion";

import TasksList from "../components/TasksList";
import TasksContext from "../contexts/TasksContext";

const Main = ({ navigation }) => {
  const { taskList, database, initialQuery } = useContext(TasksContext);

  //const [database, setDatabase] = useState(null);
  //const [tasks, setTasks] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //getContentDatabase().then((res) => setDatabase(res));
    /*
    getTaskList().then((res) => {
      setTasks(res);
      setLoading(false);
    });
    console.log(taskList);
    */
    initialQuery();
  }, []);

  /*
  useEffect(() => {
    if (taskList !== null && loading) {
      setLoading(false);
    }
  }, [taskList]);
  */

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
          <View style={styles.controllers}>
            <Button
              title="New | +"
              onPress={() =>
                navigation.navigate("New task", {
                  db_title: database.title[0].plain_text,
                  db_tags: database.properties.Tags.multi_select.options,
                })
              }
            />
          </View>
          <TasksList />
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator />
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
  controllers: {
    marginTop: 16,
    paddingHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
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
