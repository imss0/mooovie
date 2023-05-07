import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import { API_KEY } from "@env";
import { useState, useEffect } from "react";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
import Vote from "../components/Vote";
// Create styled components
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 700;
  margin: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  width: 120px;
  text-align: center;
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
`;

const TrendingScroll = styled.ScrollView`
  margin-left: 15px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const VoteText = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  color: ${(props) => props.theme.textColor}};
`;

const Column = styled.View``;

const HorizontalMovie = styled.View`
  flex-direction: row;
  padding: 0px 30px;
`;

const HorizontalTitle = styled.Text`
  text-align: left;
  width: 200px;
  margin: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor}};
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor}};
  margin: 10px;
  overflow: hidden;
  `;
// Global variable

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Main function
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [upComing, setUpcoming] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-us&page=1`
      )
    ).json();
    setNowPlaying(results);
  };

  const getUpComing = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-us&page=1`
      )
    ).json();
    setUpcoming(results);
  };

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpComing(), getTrending()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
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
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll horizontal showsHorizontalScrollIndicator={false}>
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path}></Poster>
              {movie.vote_average > 0 ? (
                <Vote vote_average={movie.vote_average}></Vote>
              ) : (
                <VoteText>Coming soon</VoteText>
              )}
              <Title>{movie.title}</Title>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListTitle>Upcoming Movies</ListTitle>
      {upComing.map((movie) => (
        <HorizontalMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <Column>
            <HorizontalTitle>{movie.title}</HorizontalTitle>
            <Overview>{movie.overview}</Overview>
          </Column>
        </HorizontalMovie>
      ))}
    </Container>
  );
};

export default Movies;
