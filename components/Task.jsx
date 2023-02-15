import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";

const Task = () => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.taskContainer}>
      <View style={styles.topRow}>
        <Checkbox
          color={"#2383E2"}
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
        />
        <Text>My first task at Tasks for Notion!</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.dueDate}>Due date: 14/03/2023 14:30</Text>
        <ScrollView horizontal style={styles.tagsContainer}>
          <Text style={styles.tag}>Work</Text>
          <Text style={styles.tag}>Personal</Text>
          <Text style={styles.tag}>Job</Text>
          <Text style={styles.tag}>Urgent</Text>
          <Text style={styles.tag}>Personal</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    marginBottom: 10,
    //height: 90,
    //width: "90%",
    display: "flex",
    borderWidth: 2,
    borderColor: "#3C3C3C",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topRow: {
    marginTop: 10,
    width: "92.5%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  bottomRow: {
    width: "92.5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  dueDate: {
    color: "#920000",
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  tag: {
    backgroundColor: "#ffe6ba",
    marginHorizontal: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});

export default Task;
