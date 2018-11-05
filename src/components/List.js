import React from "react";
import styled from "styled-components";
import commaNumber from "comma-number";

const Item = styled.div`
  margin-top: 2em;
  margin-bottom: 2em;
  border-top: ${props => (props.border ? "2px solid #666666" : "none")};
`;

const Details = styled.div`
  margin-top: 0.5em;
`;

const SingleDetail = styled.p`
  font-size: 0.9em;
`;

const addIndex = function addInformativeIndex(index) {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return `#${index + 1}.`;
  }
};

const List = props => {
  const { data } = props;
  console.log(data);

  return (
    <section>
      {data.map((item, index) => {
        let borderTop = true;
        if (index === 0) {
          borderTop = false;
        }
        return (
          <Item key={index} border={borderTop}>
            <h1>
              {addIndex(index)} {item.label}
            </h1>
            <Details>
              <SingleDetail>
                GitHub Stars: {commaNumber(item.github.stars)}
              </SingleDetail>
              <SingleDetail>
                GitHub Watching: {commaNumber(item.github.watch)}
              </SingleDetail>
              <SingleDetail>
                GitHub Forks: {commaNumber(item.github.forks)}
              </SingleDetail>
              <SingleDetail>
                NPM Downloads (last week): {commaNumber(item.downloads)}
              </SingleDetail>
            </Details>
          </Item>
        );
      })}
    </section>
  );
};

export default List;
