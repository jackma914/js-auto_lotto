import React, { useState, useRef } from "react";
import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { connect } from "react-redux";
import firebase from "firebase";

function UploadModal(props) {
  const [editorText, setEditorText] = useState("");

  const { width, height } = props;
  const inputRef = useRef();
  const [source, setSource] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };
  const handleChoose = (event) => {
    inputRef.current.click();
  };

  const reset = (e) => {
    setEditorText("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" || (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(event) => reset(event)}>
                <CloseIcon />
              </button>
            </Header>

            <ShareContent>
              <UserInfo>
                <div>
                  <AccountCircleIcon />
                </div>
                <span>Name</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="what do you want to talk about?"
                  autoFocus={true}
                />
                <UploadVideo>
                  <input
                    type="file"
                    ref={inputRef}
                    name="video"
                    accept=".mov,.mp4"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <p>
                    {!source && <button onClick={handleChoose}>Choose</button>}
                    {source && (
                      <video
                        className="VideoInput_video"
                        width="100%"
                        height={height}
                        controls
                        src={source}
                      />
                    )}
                  </p>
                </UploadVideo>
              </Editor>
            </ShareContent>

            <ShareCreation>
              <AttachAssets>
                <AttachButton></AttachButton>
              </AttachAssets>

              <PostButton disabled={!editorText ? true : false}>
                Post
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: intial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    pointer-events: none;
  }
`;

const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  div {
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }

  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
`;

const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AttachButton = styled.button`
  display: flex;
  align-items: center;
  min-width: auto;
  height:40px
  color: rgba(0, 0, 0, 0.5);
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadVideo = styled.div``;

export default UploadModal;
