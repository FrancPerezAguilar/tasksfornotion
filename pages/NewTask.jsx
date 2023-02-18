import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const NewTask = ({ route, navigation }) => {
  const [taskName, setTaskName] = useState("");
  const { db_title } = route.params;

  const [date, setDate] = useState(new Date(1598051730000));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text>Add a task into {db_title} database</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTaskName}
        value={taskName}
        placeholder="New task"
        multiline
      />

      <DateTimePicker testID="dateTimePicker" value={date} is24Hour={true} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "90%",
  },
});

export default NewTask;
