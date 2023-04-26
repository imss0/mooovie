import AppLoading from "expo-app-loading";
import React from "react";
import * as Font from "expo-font";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";

export default function App() {
  const [fonts] = Font.useFonts(FontAwesome5.font);
  if (!fonts) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
