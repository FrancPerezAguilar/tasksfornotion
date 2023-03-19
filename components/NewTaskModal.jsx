import React, { useState, useEffect } from "react";
import { Keyboard, Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import NewTaskForm from "./NewTaskForm";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const NewTaskModal = ({ toggle, setToggle }) => {
  const translateY = useSharedValue(0);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(
        translateY.value,
        -SCREEN_HEIGHT + SCREEN_HEIGHT / 2
      );
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 2) {
        translateY.value = withSpring(0, { damping: 50 });
      }
    });

  const rModalStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (toggle) {
      translateY.value = withSpring(-SCREEN_HEIGHT / 2, { damping: 50 });
    }
    if (!toggle) {
      translateY.value = withSpring(0, { damping: 50 });
    }
  }, [toggle]);

  useEffect(() => {
    if (toggle && keyboardStatus) {
      translateY.value = withSpring(-SCREEN_HEIGHT + 175, { damping: 50 });
    }
    if (toggle && !keyboardStatus) {
      translateY.value = withSpring(-SCREEN_HEIGHT / 2, { damping: 50 });
    }
  }, [keyboardStatus]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.modal, rModalStyle]}>
        <View style={styles.line}></View>
        {toggle && <NewTaskForm setToggle={setToggle} />}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  modal: {
    zIndex: 100,
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderRadius: 25,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: -2, width: 0 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 25, //IOS
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "#2383E2",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default NewTaskModal;
