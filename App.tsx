import AppLoading from "expo-app-loading";
import React from "react";
import * as Font from "expo-font";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styles";

export default function App() {
  const [fonts] = Font.useFonts(FontAwesome5.font);
  const isDark = useColorScheme() === "dark";
  if (!fonts) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
