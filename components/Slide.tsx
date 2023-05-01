import React from "react";
import styled from "styled-components/native";
import { View, StyleSheet, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

// Styled Component
const BackgroundImg = styled.Image``;

const Poster = styled.Image`
  width: 110px;
  height: 170px;
  margin-left: 15px;
`;

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

const Vote = styled(Title)`
  font-size: 14px;
  margin-right: 10px;
`;

const VoteContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

// Props
interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
  overview: string;
}

// Utility Functions

const getStars = (rating: number) => {
  rating = Math.round(rating) / 2;
  let output = [];
  for (var i = rating; i >= 1; i--) output.push("full");
  if (i == 0.5) output.push("half");
  for (let i = 5 - rating; i >= 1; i--) output.push("empty");
  return output;
};

const makeImgPath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

// View
const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
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
          <Poster source={{ uri: makeImgPath(poster_path) }}></Poster>
          <TextWrapper>
            <Title isDark={isDark}>{original_title}</Title>
            {vote_average > 0 ? (
              <VoteContainer>
                <Vote isDark={isDark}>{vote_average}</Vote>
                <Vote isDark={isDark}>
                  {getStars(vote_average).map((item, index) => {
                    if (item === "full") {
                      return (
                        <FontAwesome
                          name="star"
                          size={14}
                          color="#fbbf24"
                          key={index}
                        />
                      );
                    }
                    if (item === "half") {
                      return (
                        <FontAwesome
                          name="star-half-full"
                          size={14}
                          color="#fbbf24"
                          key={index}
                        />
                      );
                    }

                    if (item === "empty") {
                      return (
                        <FontAwesome
                          name="star-o"
                          size={14}
                          color="#fbbf24"
                          key={index}
                        />
                      );
                    }
                  })}
                </Vote>
              </VoteContainer>
            ) : null}
            <OverView isDark={isDark}>{overview}</OverView>
          </TextWrapper>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
