import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
} from "react-native";

const Onboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/onboardpicture.png")}
      />
      <Text style={styles.text}>Welcome to Tasks for Notion!</Text>
      <Button title="Configure" onPress={() => navigation.navigate("Auth")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { height: 250, width: 250, marginBottom: 25 },
  text: { fontSize: 20, marginVertical: 25 },
});

export default Onboard;
