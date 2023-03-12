import React, { useEffect, useState, useContext } from "react";
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
import { Dialog, Overlay, Icon } from "@rneui/themed";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";

import { createTask } from "../apis/notion";
import { colorTags } from "../apis/colors";
import TasksContext from "../contexts/TasksContext";

const NewTask = ({ navigation }) => {
  const TAG_OPTIONS = [];
  const { database, addTask } = useContext(TasksContext);
  const [taskName, setTaskName] = useState("");
  const [datetime, setDatetime] = useState(new Date(1598051730000));
  const [reminder, setReminder] = useState("NOT");
  const [tags, setTags] = useState("");
  const [dtvisible, setDTvisible] = useState(false);
  const [remindervisible, setRemindervisible] = useState(false);
  const [tagsvisible, setTagsvisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [loading, setLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    //setShow(false);
    setDatetime(currentDate);
  };

  const toggleDTOverlay = () => {
    setDTvisible(!dtvisible);
  };

  const toggleReminderOverlay = () => {
    setRemindervisible(!remindervisible);
  };

  const toggleTagsOverlay = () => {
    setTagsvisible(!tagsvisible);
  };

  function onMultiChange() {
    return (item) => setSelectedTags(xorBy(selectedTags, [item], "id"));
  }

  useEffect(() => {
    database.properties.Tags.multi_select.options.map((item, i) => {
      TAG_OPTIONS.push({
        item: item.name,
        id: item.id,
      });
    });
  }, []);

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
              numberOfLines={5}
            />
            <View style={styles.buttonRow}>
              <Icon
                raised
                name="event"
                type="material"
                color="#2383E2"
                onPress={toggleDTOverlay}
              />
              <Icon
                raised
                name="notifications"
                type="material"
                color="#2383E2"
                onPress={toggleReminderOverlay}
              />
              <Icon
                raised
                name="label"
                type="material"
                color="#2383E2"
                onPress={toggleTagsOverlay}
              />
            </View>

            <View style={styles.commit}>
              <Button
                title="Create task"
                style={styles.commitButton}
                onPress={() => {
                  setLoading(true);
                  addTask({
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

          <Overlay
            style={styles.overlay}
            isVisible={dtvisible}
            onBackdropPress={toggleDTOverlay}
          >
            <View style={styles.datePickerViewiOS}>
              <Text>Date and Time</Text>
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
          </Overlay>
          <Overlay
            style={styles.overlay}
            isVisible={remindervisible}
            onBackdropPress={toggleReminderOverlay}
          >
            <View style={styles.picker}>
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
          </Overlay>
          <Overlay
            style={styles.overlay}
            isVisible={tagsvisible}
            onBackdropPress={toggleTagsOverlay}
          >
            <View
              style={{
                width: 300,
              }}
            >
              <SelectBox
                label="Tags"
                arrowIconColor={"#2383E2"}
                searchIconColor={"#2383E2"}
                toggleIconColor={"#2383E2"}
                multiOptionContainerStyle={{ backgroundColor: "#2383E2" }}
                options={TAG_OPTIONS}
                selectedValues={selectedTags}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                isMulti
              />
            </View>
          </Overlay>
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
    paddingTop: 25,
  },
  input: {
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    height: 100,
    width: "90%",
    borderColor: "#2383E2",
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  overlay: {
    width: "90%",
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
    width: 250,
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
