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

import { URL, CLIENT_ID, CLIENT_SECRET } from "../secrets";

const authFlow = async (navigation) => {
  const firstRequest = await AuthSession.startAsync({
    authUrl: URL,
  }).then(async (res) => {
    if (res?.type === "success") {
      const auth = await fetch("https://api.notion.com/v1/oauth/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${CLIENT_ID}:${CLIENT_SECRET}`,
        },
        body: {
          grant_type: "authorization_code",
          code: `${res.params.code}`,
          redirect_uri: "https://auth.expo.io/@francwithc/tasksfornotion",
        },
      }).then((res) => {
        if (res?.ok === false) {
          console.log(
            "Something went wrong with authentication flow :( Try again!"
          );
          navigation.navigate("Onboard");
        } else {
          SecureStore.setItemAsync("tfn_notion_user_token", auth.access_token);
          console.log(JSON.stringify(auth));
        }
      });
    } else {
      console.log(
        "Something went wrong with authentication flow :( Try again!"
      );
      navigation.navigate("Onboard");
    }
  });
};

const Onboard = ({ navigation }) => {
  //const redirectURI = Linking.useURL();
  const [result, setResult] = useState(null);
  const [uriLocal, setUriLocal] = useState(undefined);

  const _handlePressButtonAsync = async () => {
    authFlow(navigation).then((res) => {
      console.log(res);
      navigation.navigate("Select database");
    });
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
