import React from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import VideocamIcon from "@material-ui/icons/Videocam";
import styled from "styled-components";

export default function Example() {
  return (
    <Menu
      menuButton={
        <MenuButton>
          <MultiVideoIcon />
        </MenuButton>
      }
    >
      <MenuItem>New File</MenuItem>
      <SubMenu label="Open">
        <MenuItem>index.html</MenuItem>
        <MenuItem>example.js</MenuItem>
        <MenuItem>about.css</MenuItem>
      </SubMenu>
      <MenuItem>Save</MenuItem>
    </Menu>
  );
}

const MultiVideoIcon = styled(VideocamIcon)`
  border: none;
  background: ;
`;
