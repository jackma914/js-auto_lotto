// import { Container } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

function Section() {
  return (
    <Container>
      <Popular />
      <Recommended>
        <h1></h1>
      </Recommended>
    </Container>
  );
}

export default Section;

const Container = styled.div``;

const Popular = styled.div``;

const Recommended = styled.div``;
