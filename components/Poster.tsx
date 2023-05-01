import React from "react";
import styled from "styled-components/native";

const Image = styled.Image`
  width: 110px;
  height: 170px;
  margin-left: 15px;
`;

interface PosterProps {
  path: string;
}
const makeImgPath = (img: string, width: string = "w500") =>
  `https://image.tmdb.org/t/p/${width}${img}`;

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Image source={{ uri: makeImgPath(path) }}></Image>
);
export default Poster;
