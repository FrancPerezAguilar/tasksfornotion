import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FAB } from "@rneui/themed";
import * as SecureStore from "expo-secure-store";

import { getDatabasesList } from "../apis/notion";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>
      {item.title[0]?.plain_text}
    </Text>
  </TouchableOpacity>
);

const Auth = () => {
  const [dblist, setDBlist] = useState(undefined);
  const [selectedId, setSelectedId] = useState(undefined);

  const selectDatabaseForUse = (db_id) => {
    SecureStore.setItemAsync("tfn_database_selected_id", db_id);
    //handleChange();
  };

  useEffect(() => {
    getDatabasesList().then((res) => setDBlist(res));
  }, []);

  //useEffect(() => {}, [selectedId]);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#c2c2c2" : "#e2e2e2";
    const color = item.id === selectedId ? "black" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a database to use it as task list.</Text>
      <FlatList
        data={dblist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={styles.flatlist}
      />
      <FAB
        visible={selectedId !== undefined}
        //icon={{ name: "arrow_forward", type: "material", color: "white" }}
        color="#2383E2"
        placement="right"
        style={styles.fab}
        title="Select database"
        onPress={() => {
          selectDatabaseForUse(selectedId);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { width: "80%", fontSize: 20, marginVertical: 15, textAlign: "center" },
  flatlist: {
    width: "100%",
    marginBottom: "10%",
  },
  item: {
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 2,
    borderRadius: "10%",
  },
  title: {
    fontSize: 20,
  },
  fab: {
    marginBottom: "10%",
  },
});

export default Auth;
