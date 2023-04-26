import React from "react";
import { View, Text, useColorScheme } from "react-native";
import * as colors from "../colors";

const Tv = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? colors.BLACK : colors.WHITE,
      }}
    >
      <Text>Tv</Text>
    </View>
  );
};

export default Tv;
