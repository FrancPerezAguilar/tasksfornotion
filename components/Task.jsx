import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import { colorTags } from "../apis/colors";

import { updateTask } from "../apis/notion";

const Task = ({ content }) => {
  const [id, setId] = useState(null);
  const [checkbox, setCheckbox] = useState(false);
  const [taskName, setTaskName] = useState(null);
  const [date, setDate] = useState(null);
  const [ltags, setLtags] = useState(null);

  useEffect(() => {
    setId(content.id);
    setCheckbox(content.properties.Done.checkbox);
    setTaskName(content.properties.Name.title[0].plain_text);
    setDate(content.properties.Date.date);
    setLtags(content.properties.Tags.multi_select);
    // Cuando llegue el contenido, asignarlo a los states correspondientes
  }, []);

  // crear un useEffect para cada uno de los conenidos de la tarea, i controlar sus
  // eventos. Al tener un cambio, hacer un update a la API.
  useEffect(() => {
    const payload = {
      Done: {
        checkbox: checkbox,
      },
    };
    //updateTask(id, payload);
  }, [checkbox]);
  useEffect(() => {}, [taskName]);
  useEffect(() => {}, [date]);
  useEffect(() => {}, [ltags]);

  return (
    <View style={styles.taskContainer}>
      <View style={styles.topRow}>
        <Checkbox
          color={"#2383E2"}
          style={styles.checkbox}
          value={checkbox}
          onValueChange={setCheckbox}
        />
        <Text>{taskName === null ? null : taskName}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.dueDate}>{date === null ? null : date.start}</Text>
        <ScrollView horizontal style={styles.tagsContainer}>
          {ltags === null
            ? null
            : ltags.map((tag, i) => {
                return (
                  <Text
                    key={i}
                    style={{
                      backgroundColor: colorTags(tag.color),
                      marginHorizontal: 2,
                      paddingHorizontal: 5,
                      borderRadius: 5,
                    }}
                  >
                    {tag.name}
                  </Text>
                );
              })}
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
    minWidth: "55%",
    color: "#920000",
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },
  tag: {
    backgroundColor: "orange",
    marginHorizontal: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});

export default Task;
