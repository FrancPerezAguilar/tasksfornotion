import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Overlay, Icon, Button } from "@rneui/themed";

import Multiselect from "../components/Multiselect";
import TasksContext from "../contexts/TasksContext";

const NewTaskForm = ({ setToggle }) => {
  const { addTask } = useContext(TasksContext);
  const [loading, setLoading] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [datetime, setDatetime] = useState(new Date(1598051730000));
  const [reminder, setReminder] = useState("NOT");
  const [selected, setSelected] = React.useState(new Map());
  const [dtvisible, setDTvisible] = useState(false);
  const [remindervisible, setRemindervisible] = useState(false);
  const [tagsvisible, setTagsvisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
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

  const getTagsArrayFromMap = () => {
    var arr = [];
    selected.forEach((values, id) => {
      arr.push({
        id: id,
      });
    });
    return arr;
  };

  return (
    <>
      {!loading ? (
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={setTaskName}
              value={taskName}
              placeholder="New task"
              multiline
              numberOfLines={5}
            />
            <View style={styles.buttons}>
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
              <View>
                <Button
                  buttonStyle={{ width: 150, height: 50 }}
                  containerStyle={{ margin: 5, borderRadius: 25 }}
                  icon={
                    <Icon name="add" type="material" size={25} color="#FFF" />
                  }
                  title="Create"
                  titleStyle={{ marginHorizontal: 5 }}
                  onPress={() => {
                    setLoading(true);
                    addTask({
                      name: taskName,
                      date: datetime.toISOString(),
                      tagID: getTagsArrayFromMap(),
                    }).then((res) => {
                      if (res !== null) {
                        setToggle(false);
                      }
                      if (res === null) {
                        setLoading(false);
                        Alert.alert("Some errors occurred...", "Try again");
                      }
                    });
                  }}
                />
              </View>
            </View>
          </View>

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
            <Multiselect selected={selected} setSelected={setSelected} />
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
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 10,
    height: 100,
    width: "90%",
    borderColor: "#2383E2",
  },
  buttons: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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

export default NewTaskForm;
