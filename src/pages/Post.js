import React from "react";
import styled from "styled-components";

function Post({ username, caption, imageUrl }) {
  return (
    <Container>
      <H3>
        <h3>UserName</h3>
      </H3>
      <Img>
        <img src={imageUrl} alt="post__image" />
      </Img>
      <H4>
        <h4>
          <strong>{username}</strong> {caption}
        </h4>
      </H4>
    </Container>
  );
}

export default Post;

const Container = styled.div``;
const H3 = styled.div``;
const Img = styled.div`
  img {
    // width: 100%;
    object-fit: contain;
  }
`;
const H4 = styled.div``;
