import React, { useEffect } from "react";
import { Avatar, Card, Statistic } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/index";
import { getUserByUserId } from "../modules/totalCyphers";

function UserInfoSec(parameter: any): JSX.Element {
  const userId = parameter.parameter;
  const dispatch = useDispatch();
  const userInfo = useSelector(
    (state: RootState) => state.totalCyphers.focusedUser
  );
  useEffect(() => {
    dispatch(getUserByUserId(userId));
  }, []);
  if (userInfo) {
    return (
      <Card
        style={{ width: "27%" }}
        title={
          <FlexBox style={{ justifyContent: "center", alignItems: "center" }}>
            <Avatar size="large">{userInfo && userInfo.grade}급</Avatar>
            <span
              style={{
                paddingLeft: "10px",
                fontSize: "16px",
                fontWeight: "lighter",
              }}
            >
              {userInfo && userInfo.nickname}
            </span>
          </FlexBox>
        }
      >
        <FlexBox>
          <Statistic
            title="클랜"
            value={userInfo.clanName ? userInfo.clanName : "없음"}
            valueStyle={{ fontSize: "14px", fontWeight: "bold" }}
          />
        </FlexBox>
        <FlexBox>
          <Statistic
            title="등급"
            value={userInfo.tierName ? userInfo.tierName : "없음"}
            valueStyle={{ fontSize: "14px", fontWeight: "bold" }}
          />
        </FlexBox>
        <FlexBox>
          <Statistic
            title="최고RP"
            value={
              userInfo.maxRatingPoint
                ? userInfo.maxRatingPoint
                : "최근 공식전을 플레이하지 않았습니다."
            }
            valueStyle={{ fontSize: "14px", fontWeight: "bold" }}
          />
        </FlexBox>
        <br />
        <FlexBox>
          <Statistic title="최근 전적" valueStyle={{ display: "none" }} />
        </FlexBox>
        <Statistic title="공식전" valueStyle={{ display: "none" }} />
        <FlexBox style={{ justifyContent: "space-between", width: "50%" }}>
          <Statistic
            title="승"
            value={userInfo.winCount && userInfo.records[0].winCount}
            valueStyle={{ fontSize: "12px", fontWeight: "bold" }}
          />
          <Statistic
            title="패"
            value={userInfo && userInfo.records[0].loseCount}
            valueStyle={{ fontSize: "12px", fontWeight: "bold" }}
          />
          <Statistic
            title="중단"
            value={userInfo && userInfo.records[0].stopCount}
            valueStyle={{ fontSize: "12px", fontWeight: "bold" }}
          />
        </FlexBox>
        <Statistic title="일반전" valueStyle={{ display: "none" }} />
        <FlexBox style={{ justifyContent: "space-between", width: "50%" }}>
          <Statistic
            title="승"
            value={userInfo && userInfo.records[1].winCount}
            valueStyle={{ fontSize: "12px", fontWeight: "bold" }}
          />
          <Statistic
            title="패"
            value={userInfo && userInfo.records[1].loseCount}
            valueStyle={{ fontSize: "12px", fontWeight: "bold" }}
          />
          <Statistic
            title="중단"
            value={userInfo && userInfo.records[1].stopCount}
            valueStyle={{ fontSize: "12px", fontWeight: "bold" }}
          />
        </FlexBox>
      </Card>
    );
  } else {
    return <div>로딩 중...</div>;
  }
}

export default UserInfoSec;

const FlexBox = styled.div`
  display: flex;
  padding-bottom: 10px;
`;
