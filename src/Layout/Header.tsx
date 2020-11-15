import React, { useEffect, useCallback } from "react";
import { DatePicker } from "antd";
import styled from "styled-components";

function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <Title>Total Cyphers</Title>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 50px;
  background-color: #1f1f1f;
`;

const Title = styled.h1`
  font-family: "Anton", sans-serif;
  margin-left: 30px;
  font-size: 22px;
  line-height: 50px;
  color: #ececec;
`;

export default Header;
