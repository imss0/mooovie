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

const SmallText = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  color: ${(props) => props.theme.textColor}};
`;

//@ts-ignore
const Vertical = ({ id, poster_path, vote_average, title }) => {
  return (
    <Movie key={id}>
      <Poster path={poster_path}></Poster>
      {vote_average > 0 ? (
        <Vote vote_average={vote_average}></Vote>
      ) : (
        <SmallText>Coming soon</SmallText>
      )}
      <Title>{title}</Title>
    </Movie>
  );
};

export default Vertical;
