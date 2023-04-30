import React from "react";
import { Text, useColorScheme, TouchableOpacity } from "react-native";
import * as colors from "../colors";
import styled from "styled-components/native";

const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.mainBgColor}
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
`;

//@ts-ignore
const Movies = ({ navigation: { navigate } }) => {
  return (
    //@ts-ignore
    <Btn onPress={() => navigate("Stack", { screen: "One" })}>
      <Title>Movies</Title>
    </Btn>
  );
};

export default Movies;
