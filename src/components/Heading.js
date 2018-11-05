import React from "react";
import styled from "styled-components";

const HeadingWrapper = styled.header`
  margin-top: 2em;
  margin-bottom: 2em;
  padding-bottom: 1em;
  border-bottom: 3px solid #666666;
`;

const MainHeading = styled.h1`
  font-size: 1.75em;
  margin: 0;
  display: block;
`;

const Subheading = styled.h2`
  font-size: 1em;
  display: block;
  margin-top: 0.9em;
`;

const LastUpdated = styled.h3`
  font-size: 0.85em;
  display: block
  font-weight: normal;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
`;

const Heading = props => {
  const { updated } = props;
  return (
    <HeadingWrapper>
      <MainHeading>FrontRank</MainHeading>
      <Subheading>Basic front-end framework popularity ranking</Subheading>
      <LastUpdated>Last updated: {updated}</LastUpdated>
    </HeadingWrapper>
  );
};

export default Heading;
