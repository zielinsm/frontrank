import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { PropagateLoader } from "react-spinners";

import processData from "./modules/processData";
import List from "./components/List";
import Heading from "./components/Heading";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    font-size: 16px;
    color: #212121;
    background-color: #fcfcfc;
  }
`;

const Container = styled.main`
  display: flex;
  justify-content: center;
`;

const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 500px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      datasets: []
    };
  }

  componentDidMount() {
    fetch("/.netlify/functions/results")
      .then(data => data.json())
      .then(datasets => {
        let processedResults = processData(datasets.results);
        let updated = datasets.updated;
        return {
          updated,
          results: processedResults
        };
      })
      .then(datasets => {
        this.setState({ loading: false, datasets });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <LoaderWrapper>
            <PropagateLoader color={"#212121"} loading={this.state.loading} />
          </LoaderWrapper>
        ) : (
          <ContentWrapper>
            <Heading updated={this.state.datasets.updated} />
            <List data={this.state.datasets.results} />
          </ContentWrapper>
        )}
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
