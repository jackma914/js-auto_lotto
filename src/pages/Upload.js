import React, { useState } from "react";
import UploadModal from "./UploadModal";
import styled from "styled-components";

function Upload() {
  const [showModal, setShowModal] = useState("close");
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  return (
    <Container>
      {" "}
      <div>
        <button onClick={handleClick}>start a post</button>
      </div>
      <UploadModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
}

export default Upload;

const Container = styled.div``;
