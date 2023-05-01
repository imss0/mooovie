import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { API_KEY } from "@env";
import { useState, useEffect } from "react";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

// Create styled components
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BackgroundImg = styled.Image``;

const Poster = styled.Image`
  width: 110px;
  height: 170px;
  margin-left: 15px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
  color: ${(props) => props.theme.textColor};
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

const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  margin-top: 5px;
`;

const Vote = styled(Title)`
  font-size: 14px;
  margin-right: 10px;
`;

const VoteContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

// Utility function & variable
const makeImgPath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const getStars = (rating: number) => {
  rating = Math.round(rating) / 2;
  let output = [];
  for (var i = rating; i >= 1; i--) output.push("full");
  //<FontAwesome name="star" size={24} color="yellow" />&nbsp;
  if (i == 0.5) output.push("half");
  //<FontAwesome name="star-half-full" size={24} color="yellow" />&nbsp;
  for (let i = 5 - rating; i >= 1; i--) output.push("empty");
  // <FontAwesome name="star-o" size={24} color="yellow" /> & nbsp;

  return output;
};

// Main function
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const isDark = useColorScheme() === "dark";

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-us&page=1`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        loop
        horizontal
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={false}
        showsButtons={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BackgroundImg
              source={{ uri: makeImgPath(movie.backdrop_path) }}
              style={StyleSheet.absoluteFill}
            />
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={50}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster
                  source={{ uri: makeImgPath(movie.poster_path) }}
                ></Poster>
                <TextWrapper>
                  <Title>{movie.original_title}</Title>
                  {movie.vote_average > 0 ? (
                    <VoteContainer>
                      <Vote>{movie.vote_average}</Vote>
                      <Vote>
                        {getStars(movie.vote_average).map((item, index) => {
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
                  <OverView>{movie.overview}</OverView>
                </TextWrapper>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
