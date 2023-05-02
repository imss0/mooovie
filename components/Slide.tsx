import React from "react";
import styled from "styled-components/native";
import { View, StyleSheet, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import Poster from "../components/Poster";
import Vote from "../components/Vote";

// Styled Component
const BackgroundImg = styled.Image``;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
`;

const TextWrapper = styled.ScrollView`
  width: 60%;
  margin-left: 20px;
  margin-right: 15px;
  height: 170px;
  overflow: scroll;
`;

const OverView = styled(Title)`
  opacity: 0.8;
  font-weight: 400;
  font-size: 14px;
`;

// Props
interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  overview: string;
  vote_average: number;
}

// Utility Functions
const makeImgPath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

// View
const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  overview,
  vote_average,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BackgroundImg
        source={{ uri: makeImgPath(backdrop_path) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={50}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={poster_path} />
          <TextWrapper>
            <Title isDark={isDark}>{original_title}</Title>
            {vote_average > 0 ? (
              <Vote vote_average={vote_average}></Vote>
            ) : null}
            <OverView isDark={isDark}>{overview}</OverView>
          </TextWrapper>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
