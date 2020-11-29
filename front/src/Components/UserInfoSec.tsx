import React, { useEffect, useCallback } from "react";
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
  useEffect(() => {
    dispatch(getUserByUserId(userId));
  }, [parameter]);
  useEffect(() => {
    console.log("유저인포", userInfo);
  });
  const checkNormalGameRecordsExist = useCallback((recordsData: any) => {
    const result = recordsData.find((datas: any) => {
      if (datas.gameTypeId === "normal") {
        return true;
      }
    });
    if (result !== undefined) return true;
    else return false;
  }, []);
  const checkRatingGameRecordsExist = useCallback((recordsData: any) => {
    const result = recordsData.find((datas: any) => {
      if (datas.gameTypeId === "rating") {
        return true;
      }
    });
    if (result !== undefined) return true;
    else return false;
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
        {userInfo.records && (
          <div>
            <FlexBox>
              <Statistic title="최근 전적" valueStyle={{ display: "none" }} />
            </FlexBox>
            <Statistic title="공식전" valueStyle={{ display: "none" }} />
            {checkRatingGameRecordsExist(userInfo.records)
              ? userInfo.records.map((recordsData: any, index: number) => {
                  if (recordsData.gameTypeId === "rating") {
                    return (
                      <div key={index}>
                        <FlexBox
                          style={{
                            justifyContent: "space-between",
                            width: "50%",
                          }}
                        >
                          <Statistic
                            title="승"
                            value={recordsData.winCount}
                            valueStyle={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                          <Statistic
                            title="패"
                            value={recordsData.loseCount}
                            valueStyle={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                          <Statistic
                            title="중단"
                            value={recordsData.stopCount}
                            valueStyle={{
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          />
                        </FlexBox>
                      </div>
                    );
                  }
                })
              : "최근 공식전 전적이 없습니다."}
            <Statistic title="일반전" valueStyle={{ display: "none" }} />
            {checkNormalGameRecordsExist(userInfo.records)
              ? userInfo.records.map((checkData: any, checkIndex: number) => {
                  if (checkData.gameTypeId === "normal") {
                    return userInfo.records.map(
                      (recordsData: any, index: number) => {
                        if (recordsData.gameTypeId === "normal") {
                          return (
                            <div key={index}>
                              <FlexBox
                                style={{
                                  justifyContent: "space-between",
                                  width: "50%",
                                }}
                              >
                                <Statistic
                                  title="승"
                                  value={recordsData.winCount}
                                  valueStyle={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
                                />
                                <Statistic
                                  title="패"
                                  value={recordsData.loseCount}
                                  valueStyle={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
                                />
                                <Statistic
                                  title="중단"
                                  value={recordsData.stopCount}
                                  valueStyle={{
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
                                />
                              </FlexBox>
                            </div>
                          );
                        }
                      }
                    );
                  }
                })
              : "최근 일반전 전적이 없습니다."}
          </div>
        )}
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
