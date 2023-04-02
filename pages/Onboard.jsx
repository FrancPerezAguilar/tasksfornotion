import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";

const URL =
  "https://api.notion.com/v1/oauth/authorize?client_id=95152411-2ae3-45e6-b498-8747e83b2cd2&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40francwithc%2Ftasksfornotion";
const CLIENT_ID = "95152411-2ae3-45e6-b498-8747e83b2cd2";
const CLIENT_SECRET = "secret_FHUtlgURStFdGxLPXjT5ajB8pqLYfzITnOqKrIzb41R";

const authFlow = async () => {
  const firstRequest = await AuthSession.startAsync({
    authUrl: URL,
  }).then(async (res) => {
    if (res?.type === "success") {
      const auth = await fetch("https://api.notion.com/v1/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${CLIENT_ID}:${CLIENT_SECRET}`,
        },
        body: JSON.stringify({
          grant_type: "authorization_code",
          code: res.params.code,
          redirect_uri: "https://auth.expo.io/@francwithc/tasksfornotion",
        }),
      });

      SecureStore.setItemAsync("tfn_notion_user_token", auth.access_token);
      console.log(JSON.stringify(auth));
    } else {
      console.log(
        "Something went wrong with authentication flow :( Try again!"
      );
    }
  });
};

const Onboard = ({ navigation }) => {
  //const redirectURI = Linking.useURL();
  const [result, setResult] = useState(null);
  const [uriLocal, setUriLocal] = useState(undefined);

  const _handlePressButtonAsync = async () => {
    await authFlow();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/onboardpicture.png")}
      />
      <Text style={styles.text}>Welcome to Tasks for Notion!</Text>
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
