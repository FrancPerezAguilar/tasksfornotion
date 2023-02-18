import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getContentDatabase, getTaskList } from "../apis/notion";

import TasksList from "../components/TasksList";

const Main = ({ navigation }) => {
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    getContentDatabase().then((res) => setDatabase(res));
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.controllers}>
        <Button
          title="New | +"
          onPress={() =>
            navigation.navigate("New task", {
              db_title: database.title[0].plain_text,
            })
          }
        />
      </View>
      <TasksList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
