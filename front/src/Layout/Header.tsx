import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import total_cyphers_logo from "../static/media/total_cyphers_logo.png";
import UserSearchBar from "../Components/UserSearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../modules/index";

function Header(): JSX.Element {
  const currentUrl = useSelector(
    (state: RootState) => state.totalCyphers.currentUrl
  );
  return (
    <HeaderContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Link to="/">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={total_cyphers_logo}
              alt="토탈 사이퍼즈"
              width="30"
              height="30"
              style={{
                marginLeft: "15px",
              }}
            />
            <Title>Total Cyphers</Title>
          </div>
        </Link>
        {currentUrl.includes("/userInfo/") && (
          <div
            style={{
              marginLeft: "auto",
              width: "300px",
              height: "32px",
            }}
          >
            <UserSearchBar />
          </div>
        )}
      </div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 50px;
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
`;

const Title = styled.h1`
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  margin-left: 10px;
  font-size: 22px;
  color: #1f1f1f;
  margin-top: 0;
  margin-bottom: 0;
`;

export default Header;
