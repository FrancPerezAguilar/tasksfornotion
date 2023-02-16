import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";

const Task = ({ content }) => {
  const [checkbox, setCheckbox] = useState(false);
  const [taskName, setTaskName] = useState(null);
  const [date, setDate] = useState(null);
  const [ltags, setLtags] = useState(null);

  useEffect(() => {
    setCheckbox(content.properties.Done.checkbox);
    // Cuando llegue el contenido, asignarlo a los states correspondientes
  }, []);

  // crear un useEffect para cada uno de los conenidos de la tarea, i controlar sus
  // eventos. Al tener un cambio, hacer un update a la API.
  useEffect(() => {}, [checkbox]);

  return (
    <View style={styles.taskContainer}>
      <View style={styles.topRow}>
        <Checkbox
          color={"#2383E2"}
          style={styles.checkbox}
          value={checkbox}
          onValueChange={setCheckbox}
        />
        <Text>{content.properties.Name.title[0].plain_text}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.dueDate}>{content.properties.Date.date.start}</Text>
        <ScrollView horizontal style={styles.tagsContainer}>
          {content.properties.Tags.multi_select.map((tag, i) => {
            return (
              <Text
                key={i}
                style={{
                  backgroundColor: tag.color,
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
