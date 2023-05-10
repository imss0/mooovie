import React from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";
import Vote from "../components/Vote";

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

const SmallText = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  color: ${(props) => props.theme.textColor}};
`;

// <TrendingScroll horizontal showsHorizontalScrollIndicator={false}>
//   {trending.map((movie) => (
//     <Movie key={movie.id}>
//       <Poster path={movie.poster_path}></Poster>
//       {movie.vote_average > 0 ? (
//         <Vote vote_average={movie.vote_average}></Vote>
//       ) : (
//         <SmallText>Coming soon</SmallText>
//       )}
//       <Title>{movie.title}</Title>
//     </Movie>
//   ))}
// </TrendingScroll>;
