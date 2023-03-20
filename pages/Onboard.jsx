import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

const Onboard = ({ navigation }) => {
  const redirectURI = Linking.useURL();
  const URL =
    "https://api.notion.com/v1/oauth/authorize?client_id=95152411-2ae3-45e6-b498-8747e83b2cd2&response_type=code&owner=user&redirect_uri=https%3A%2F%2F127.0.0.1%3A19000";
  const [result, setResult] = useState(null);
  const [uriLocal, setUriLocal] = useState(undefined);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(URL);
    setResult(result);
  };

  useEffect(() => {
    Linking.getInitialURL().then((res) => {
      setUriLocal(res);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/onboardpicture.png")}
      />
      <Text style={styles.text}>Welcome to Tasks for Notion! {uriLocal}</Text>
      <Button
        title="Authenticate in Notion"
        onPress={() => _handlePressButtonAsync()}
      />
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
