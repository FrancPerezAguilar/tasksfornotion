import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import { createTask } from "../apis/notion";
import { colorTags } from "../apis/colors";

const NewTask = ({ route, navigation }) => {
  const { db_title, db_tags } = route.params;
  const [taskName, setTaskName] = useState("");
  const [datetime, setDatetime] = useState(new Date(1598051730000));
  const [reminder, setReminder] = useState("NOT");
  const [tags, setTags] = useState(null);

  const [loading, setLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    //setShow(false);
    setDatetime(currentDate);
  };

  return (
    <>
      {!loading ? (
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <TextInput
              style={styles.input}
              onChangeText={setTaskName}
              value={taskName}
              placeholder="New task"
              multiline
              numberOfLines={4}
            />
            <TouchableHighlight style={styles.datePicker}>
              {Platform.OS === "ios" ? (
                <View style={styles.datePickerViewiOS}>
                  <Text>Set due date and time</Text>
                  <DateTimePicker
                    testID="datePicker"
                    value={datetime}
                    mode={"date"}
                    onChange={onChange}
                  />
                  <DateTimePicker
                    testID="timePicker"
                    value={datetime}
                    mode={"time"}
                    is24Hour={true}
                    onChange={onChange}
                  />
                </View>
              ) : (
                <Text>{datetime.toLocaleString()}</Text>
              )}
            </TouchableHighlight>
            <Text>{datetime.toISOString()}</Text>
            <View style={styles.picker}>
              <Text>Set a reminder</Text>
              <Picker
                selectedValue={reminder}
                onValueChange={(itemValue, itemIndex) => setReminder(itemValue)}
              >
                <Picker.Item label="No reminder" value="NOT" enabled />
                <Picker.Item label="On due date" value="0" />
                <Picker.Item label="5min before" value="5m" />
                <Picker.Item label="1h before" value="1h" />
                <Picker.Item label="2h before" value="2h" />
                <Picker.Item label="1 day before" value="1d" />
                <Picker.Item label="2 day before" value="2d" />
              </Picker>
            </View>
            <View style={styles.tags}>
              <Text>Set a reminder</Text>
              <Picker
                selectedValue={tags}
                onValueChange={(itemValue, itemIndex) => setTags(itemValue)}
              >
                {db_tags.map((item, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={item.name}
                      value={item.id}
                      style={{ backgroundColor: colorTags(item.color) }}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={styles.commit}>
              <Button
                title="Create task"
                style={styles.commitButton}
                onPress={() => {
                  setLoading(true);
                  createTask({
                    name: taskName,
                    date: datetime.toISOString(),
                    tagID: tags,
                  }).then((res) => {
                    if (res !== null) {
                      setTimeout(() => {
                        navigation.goBack();
                      }, 3000);
                    }
                    if (res === null) {
                      setLoading(false);
                      Alert.alert("Some errors occurred...", "Try again");
                    }
                  });
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
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
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
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
    borderColor: "#2383E2",
  },
  datePicker: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "90%",
  },
  datePickerViewiOS: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  picker: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "90%",
  },
  tags: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    width: "90%",
  },
  commit: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "90%",
  },
  commitButton: {
    backgroundColor: "black",
  },
});

export default NewTask;
