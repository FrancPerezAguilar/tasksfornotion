import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Icon } from "@rneui/themed";

import { colorTags } from "../apis/colors";
import TasksContext from "../contexts/TasksContext";

function Item({ id, title, color, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: colorTags(color) },
        { borderWidth: selected ? 1.5 : 0 },
        { borderColor: selected ? color : null },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
      {selected ? (
        <Icon
          name="close"
          type="material"
          size={"small"}
          style={{ paddingLeft: 5 }}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const Multiselect = ({ selected, setSelected }) => {
  const { getTags } = useContext(TasksContext);
  //const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected]
  );

  return (
    <View style={styles.container}>
      <Text>Select tags:</Text>
      <FlatList
        data={getTags()}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.name}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
            color={item.color}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={selected}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    minWidth: 250,
    display: "flex",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
  },
});

export default Multiselect;
