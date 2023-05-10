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
import { RefreshControl } from "react-native-gesture-handler";
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

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

// Global variable

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Main function
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<any[]>([]);
  const [upComing, setUpcoming] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

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
    <Container
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        ></RefreshControl>
      }
    >
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
        {/* <TrendingScroll horizontal showsHorizontalScrollIndicator={false}>
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path}></Poster>
              {movie.vote_average > 0 ? (
                <Vote vote_average={movie.vote_average}></Vote>
              ) : (
                <SmallText>Coming soon</SmallText>
              )}
              <Title>{movie.title}</Title>
            </Movie>
          ))}
        </TrendingScroll> */}
      </ListContainer>
      <ListTitle>Upcoming Movies</ListTitle>
      {/* {upComing.map((movie) => (
        <HorizontalMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <Column>
            <HorizontalTitle>{movie.title}</HorizontalTitle>
            <SmallText style={{ marginLeft: 10 }}>
              Release date : {movie.release_date}
            </SmallText>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 150
                ? `${movie.overview.slice(0, 150)}...`
                : movie.overview}
            </Overview>
          </Column>
        </HorizontalMovie>
      ))} */}
    </Container>
  );
};

export default Movies;
