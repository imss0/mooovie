import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import { ActivityIndicator, Dimensions } from "react-native";
import { useState } from "react";
import Slide from "../components/Slide";
import Vertical from "../components/Vertical";
import Horizontal from "../components/Horizontal";
import { RefreshControl } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { getNowPlaying, getUpComing, getTrending } from "../movieApi";

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

const TrendingScroll = styled.ScrollView`
  margin-left: 15px;
`;

// Global variabl
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Main function
const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    "nowPlaying",
    getNowPlaying
  );

  const { isLoading: upComingLoading, data: upComingData } = useQuery(
    "upComing",
    getUpComing
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    "trending",
    getTrending
  );

  const loading = nowPlayingLoading || upComingLoading || trendingLoading;
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={<RefreshControl refreshing={refreshing}></RefreshControl>}
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
        {nowPlayingData.results.map((movie: any) => (
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
          {trendingData?.results?.map((movie: any) => (
            <Vertical
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              title={movie.title}
            ></Vertical>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListTitle>Upcoming Movies</ListTitle>
      {upComingData?.results?.map((movie: any) => (
        <Horizontal
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
          release_date={movie.release_date}
          overview={movie.overview}
        ></Horizontal>
      ))}
    </Container>
  );
};

export default Movies;
