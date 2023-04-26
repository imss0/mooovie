import AppLoading from "expo-app-loading";
import React from "react";
import * as Font from "expo-font";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./navigation/Stack";

export default function App() {
  const [fonts] = Font.useFonts(FontAwesome5.font);
  if (!fonts) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
  );
}
