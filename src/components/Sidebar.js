import React from "react";
import styled from "styled-components";

function Sidebar() {
  return (
    <Container>
      <BurgerNav>
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

export default Sidebar;

const Container = styled.div`
  height: 20%;
  display: flex;
`;

const BurgerNav = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  background: white;
  width: 300px;
  z-index: 15;
  list-style: none;
  padding: 20px;
  display: flex;
  text-align: start;
  flex-direction: column;

  li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    a {
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
