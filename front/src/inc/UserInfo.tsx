import React from "react";
import styled from "styled-components";
import UserInfoSec from "../Components/UserInfoSec";
import PlayListSec from "../Components/PlayListSec";

function UserInfo({ match }: any): JSX.Element {
  const parameter = match.params.userId;
  return (
    <BodyWrapper>
      <UserInfoSec parameter={parameter} />
      <PlayListSec parameter={parameter} />
    </BodyWrapper>
  );
}

export default UserInfo;

const BodyWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  padding: 50px;
  justify-content: space-between;
`;
