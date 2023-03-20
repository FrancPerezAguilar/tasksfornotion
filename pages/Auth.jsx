import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

const Auth = ({ setValue }) => {
  const redirectURI = Linking.useURL();
  const URL =
    "https://api.notion.com/v1/oauth/authorize?client_id=95152411-2ae3-45e6-b498-8747e83b2cd2&response_type=code&owner=user&redirect_uri=https%3A%2F%2F127.0.0.1%3A19000";
  const [result, setResult] = useState(null);

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(URL);
    setResult(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>First step!</Text>
      <Button
        title="Authenticate in Notion"
        onPress={() => {
          _handlePressButtonAsync();
        }}
      />
      <Text>{result && JSON.stringify(result)}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { width: "80%", fontSize: 20, marginBottom: 25, textAlign: "center" },
});

export default Auth;
