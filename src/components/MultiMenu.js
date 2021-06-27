import React from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import VideocamIcon from "@material-ui/icons/Videocam";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Example() {
  return (
    <Menu
      menuButton={
        <MenuButton
          styles={{
            cursor: "pointer",
            border: "none",
            backgroundColor: "white",
          }}
        >
          <MultiVideoIcon />
        </MenuButton>
      }
    >
      <MenuItem>
        <Link to="/upload">Uplode</Link>
      </MenuItem>
      <MenuItem>
        {" "}
        <Link to="/live">Live</Link>
      </MenuItem>
    </Menu>
  );
}
const MultiVideoIcon = styled(VideocamIcon)``;
