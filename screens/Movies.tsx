import React from "react";
import { View, Text, useColorScheme } from "react-native";
import * as colors from "../colors";
import styled from "styled-components/native";

const Movies = () => {
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
      <Text>Movies</Text>
    </View>
  );
};

export default Movies;
