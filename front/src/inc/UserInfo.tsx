import React, { useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/index";
import { getUserByUserId } from "../modules/totalCyphers";

function UserInfo({ match }: any): JSX.Element {
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state: RootState) => state.totalCyphers.focusedUser
  );
  const parameter = match.params.userId;
  useEffect(() => {
    dispatch(getUserByUserId(parameter));
    console.log(userInfo);
  }, []);

  return (
    <BodyWrapper>
      <PlayerInfoSec>
        <div className="userName">
          <Avatar size="large">
            {userInfo.focusedUser && userInfo.focusedUser.grade}급
          </Avatar>
        </div>
      </PlayerInfoSec>
      <PlayListSec>ㅇㅇ</PlayListSec>
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

const PlayerInfoSec = styled.div`
  width: 27%;
  border: 1px solid #afafaf;
  padding: 20px;
`;

const PlayListSec = styled.div`
  width: 70%;
  border: 1px solid #afafaf;
  padding: 20px;
`;
