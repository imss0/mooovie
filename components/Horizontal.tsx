import React from "react";
import styled from "styled-components/native";
import Poster from "../components/Poster";

const SmallText = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  color: ${(props) => props.theme.textColor}};
`;

const Column = styled.View`
  width: 65%;
  margin-left: 15px;
`;

const HorizontalMovie = styled.View`
  flex-direction: row;
  padding: 0px 20px;
  margin-bottom: 30px;
`;

const HorizontalTitle = styled.Text`
  text-align: left;
  width: 200px;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor}};
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor}};
  margin-left: 10px;
  `;

// {
//   upComing.map((movie) => (
//     <HorizontalMovie key={movie.id}>
//       <Poster path={movie.poster_path} />
//       <Column>
//         <HorizontalTitle>{movie.title}</HorizontalTitle>
//         <SmallText style={{ marginLeft: 10 }}>
//           Release date : {movie.release_date}
//         </SmallText>
//         <Overview>
//           {movie.overview !== "" && movie.overview.length > 150
//             ? `${movie.overview.slice(0, 150)}...`
//             : movie.overview}
//         </Overview>
//       </Column>
//     </HorizontalMovie>
//   ));
// }
