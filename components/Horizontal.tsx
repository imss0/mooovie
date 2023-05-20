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

  //@ts-ignore
const Horizontal = ({ id, poster_path, title, release_date, overview }) => {
  return (
    <HorizontalMovie key={id}>
      <Poster path={poster_path} />
      <Column>
        <HorizontalTitle>{title}</HorizontalTitle>
        <SmallText style={{ marginLeft: 10 }}>
          Release date : {release_date}
        </SmallText>
        <Overview>
          {overview !== "" && overview.length > 150
            ? `${overview.slice(0, 150)}...`
            : overview}
        </Overview>
      </Column>
    </HorizontalMovie>
  );
};

export default Horizontal;
