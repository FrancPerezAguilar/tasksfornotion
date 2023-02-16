import React from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";

const Onboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to Tasks for Notion!</Text>
      <Button title="Start" onPress={() => navigation.navigate("Auth")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Onboard;
