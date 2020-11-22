import React, { useEffect } from "react";
import styled from "styled-components";
import { Avatar, Card, Statistic } from "antd";
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
          <div>
            <Statistic
              title="최근 공식전 전적"
              valueStyle={{ display: "none" }}
            />
            <FlexBox style={{ justifyContent: "space-between" }}>
              <Statistic
                title="승"
                value={userInfo && userInfo.records[0].winCount}
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
          </div>
        </FlexBox>
        <FlexBox>
          <div>
            <Statistic
              title="최근 일반전 전적"
              valueStyle={{ display: "none" }}
            />
            <FlexBox style={{ justifyContent: "space-between" }}>
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
          </div>
        </FlexBox>
      </Card>
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

const FlexBox = styled.div`
  display: flex;
  padding-bottom: 10px;
`;
