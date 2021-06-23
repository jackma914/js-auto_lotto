import React, { useState } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import VideocamIcon from "@material-ui/icons/Videocam";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

function Header() {
  const [burgerStatus, setBurgerStatus] = useState(false);
  return (
    <Container>
      <LeftMenu>
        <span>
          {" "}
          <CustomMenu onClick={() => setBurgerStatus(true)} />
        </span>

        <Logo>
          <a href="">
            <img src="./logo192.png" alt="" />
          </a>
        </Logo>
      </LeftMenu>

      <Search>
        <input type="text" placeholder="Search" />
        <SearchIconButton />
      </Search>

      <RightMenu>
        <div>
          <VideocamIcon />
        </div>
        <div>
          <MoreVertIcon />
        </div>
        <Link to="/login">
          <button>로그인</button>{" "}
        </Link>
      </RightMenu>
      <BurgerNav show={burgerStatus}>
        <CloseWrapper>
          <CustomClose onClick={() => setBurgerStatus(false)} />
        </CloseWrapper>
        <li>
          <a href="#">Existing Inventory</a>
        </li>
        <li>
          <a href="#">Used Inventory</a>
        </li>
        <li>
          <a href="#">Trade-in</a>
        </li>
        <li>
          <a href="#">Cybertruck</a>
        </li>
        <li>
          <a href="#">Roadaster</a>
        </li>
      </BurgerNav>
    </Container>
  );
}

export default Header;

const Logo = styled.div`
  padding: 0 20px;
  a img {
    width: 30px;
    height: 30px;
  }
`;
const Container = styled.div`
  border: 1px solid lightgray;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: white;
`;
const LeftMenu = styled.div`
  display: flex;
  align-items: center;

  span {
    display: none;

    @media (max-width: 768px) {
      display: flex;
    }
  }
`;

const Search = styled.div`
  display: flex;
  border-radius: 2px;
  align-items: center;
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 1250px) {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }

  border: 1px solid lightgray;

  input {
    flex: 1;
    border: none;
    outline: none;
  }
`;

const SearchIconButton = styled(SearchIcon)`
  display: flex;
  justify-content: center;
  border: none;
  background: #fafafa;
  width: 50px !important;
  border-left: 1px solid lightgray;
`;

const RightMenu = styled.div`
  margin-right: 20px;
  display: flex;
  a {
  }
  div {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const CustomMenu = styled(MenuIcon)`
  cursor: pointer;

  @media (max-width: 700px) {
    display: none;
  }
`;

const BurgerNav = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  // right: 0;
  left: 0;
  background: white;
  width: 300px;
  z-index: 15;
  list-style: none;
  padding: 20px;
  display: flex;
  text-align: start;

  flex-direction: column;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};
  transition: transform 0.2s;
  li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    a {
      font-weight: 600;
    }
  }

  }
`;

const CustomClose = styled(CloseIcon)`
  cursor: pointer;
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
