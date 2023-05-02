import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

const VoteData = styled.Text<{ isDark: boolean }>`
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const VoteContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface VoteProps {
  vote_average: number;
}

const getStars = (rating: number) => {
  rating = Math.round(rating) / 2;
  let output = [];
  for (var i = rating; i >= 1; i--) output.push("full");
  if (i == 0.5) output.push("half");
  for (let i = 5 - rating; i >= 1; i--) output.push("empty");
  return output;
};

const Vote: React.FC<VoteProps> = ({ vote_average }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <VoteContainer>
      <VoteData isDark={isDark}>{vote_average.toFixed(1)}</VoteData>
      <VoteData isDark={isDark}>
        {getStars(vote_average).map((item, index) => {
          if (item === "full") {
            return (
              <FontAwesome name="star" size={12} color="#fbbf24" key={index} />
            );
          }
          if (item === "half") {
            return (
              <FontAwesome
                name="star-half-full"
                size={12}
                color="#fbbf24"
                key={index}
              />
            );
          }

          if (item === "empty") {
            return (
              <FontAwesome
                name="star-o"
                size={12}
                color="#fbbf24"
                key={index}
              />
            );
          }
        })}
      </VoteData>
    </VoteContainer>
  );
};

export default Vote;
