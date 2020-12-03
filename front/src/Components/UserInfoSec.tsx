import React, { useEffect, useCallback } from "react";
import { Avatar, Card, Statistic, Skeleton } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/index";
import { getUserByUserId } from "../modules/totalCyphers";
import SkeletonInput from "antd/lib/skeleton/Input";

type WinRecords = {
  gameTypeId: string;
  winCount: number;
  loseCount: number;
  stopCount: number;
};

function UserInfoSec(parameter: { parameter: string }): JSX.Element {
  const userId = parameter.parameter;
  const dispatch = useDispatch();
  const { focusedUser, focusingUser } = useSelector(
    (state: RootState) => state.totalCyphers
  );
  useEffect(() => {
    dispatch(getUserByUserId(userId));
  }, []);
  useEffect(() => {
    dispatch(getUserByUserId(userId));
  }, [parameter]);
  useEffect(() => {
    console.log("유저인포", focusedUser);
  });
  const checkNormalGameRecordsExist = useCallback(
    (recordsData: Array<WinRecords>) => {
      const result = recordsData.find((datas: WinRecords) => {
        if (datas.gameTypeId === "normal") {
          return true;
        }
      });
      if (result !== undefined) return true;
      else return false;
    },
    []
  );
  const checkRatingGameRecordsExist = useCallback(
    (recordsData: Array<WinRecords>) => {
      const result = recordsData.find((datas: WinRecords) => {
        if (datas.gameTypeId === "rating") {
          return true;
        }
      });
      if (result !== undefined) return true;
      else return false;
    },
    []
  );
  return (
    <Card
      style={{ width: "27%" }}
      title={
        <FlexBox style={{ justifyContent: "center", alignItems: "center" }}>
          {focusingUser ? (
            <Skeleton.Avatar
              active
              shape="circle"
              style={{ width: "40px", height: "40px" }}
            />
          ) : (
            <Avatar size="large">{focusedUser && focusedUser.grade}급</Avatar>
          )}
          {focusingUser ? (
            <Skeleton.Input
              style={{ width: "50px", height: "24px", marginLeft: "10px" }}
              active
              size="small"
            />
          ) : (
            <span
              style={{
                paddingLeft: "10px",
                fontSize: "16px",
                fontWeight: "lighter",
              }}
            >
              {focusedUser && focusedUser.nickname}
            </span>
          )}
        </FlexBox>
      }
    >
      <div>
        <ItemTitle>클랜</ItemTitle>
        {focusingUser ? (
          <Skeleton.Input
            style={{ width: "30px", height: "22px" }}
            active
            size="small"
          />
        ) : (
          <ItemContent>
            {focusedUser.clanName ? focusedUser.clanName : "없음"}
          </ItemContent>
        )}
      </div>
      <div>
        <ItemTitle>등급</ItemTitle>
        {focusingUser ? (
          <Skeleton.Input
            style={{ width: "50px", height: "22px" }}
            active
            size="small"
          />
        ) : (
          <ItemContent>
            {focusedUser.tierName ? focusedUser.tierName : "없음"}
          </ItemContent>
        )}
      </div>
      <div style={{ height: "73px" }}>
        <ItemTitle>최고 RP</ItemTitle>
        {focusingUser ? (
          <Skeleton.Input
            style={{ width: "120px", height: "22px" }}
            active
            size="small"
          />
        ) : (
          <ItemContent>
            {focusedUser.maxRatingPoint
              ? focusedUser.maxRatingPoint
              : "최근 공식전을 플레이하지 않았습니다."}
          </ItemContent>
        )}
      </div>
      <br />
      {focusedUser.records && (
        <div>
          <FlexBox>
            <Statistic title="최근 전적" valueStyle={{ display: "none" }} />
          </FlexBox>
          <Statistic title="공식전" valueStyle={{ display: "none" }} />
          {checkRatingGameRecordsExist(focusedUser.records)
            ? focusedUser.records.map(
                (recordsData: WinRecords, index: number) => {
                  if (recordsData.gameTypeId === "rating") {
                    return (
                      <div key={index}>
                        <FlexBox
                          style={{
                            justifyContent: "space-between",
                            width: "50%",
                          }}
                        >
                          <div>
                            <ItemTitle>승</ItemTitle>
                            {focusingUser ? (
                              <Skeleton.Input
                                style={{ width: "20px", height: "22px" }}
                                active
                                size="small"
                              />
                            ) : (
                              <ItemContent style={{ fontSize: "12px" }}>
                                {recordsData.winCount}
                              </ItemContent>
                            )}
                          </div>
                          <div>
                            <ItemTitle>패</ItemTitle>
                            {focusingUser ? (
                              <Skeleton.Input
                                style={{ width: "20px", height: "22px" }}
                                active
                                size="small"
                              />
                            ) : (
                              <ItemContent style={{ fontSize: "12px" }}>
                                {recordsData.loseCount}
                              </ItemContent>
                            )}
                          </div>
                          <div>
                            <ItemTitle>중단</ItemTitle>
                            {focusingUser ? (
                              <Skeleton.Input
                                style={{ width: "20px", height: "22px" }}
                                active
                                size="small"
                              />
                            ) : (
                              <ItemContent style={{ fontSize: "12px" }}>
                                {recordsData.stopCount}
                              </ItemContent>
                            )}
                          </div>
                        </FlexBox>
                      </div>
                    );
                  }
                }
              )
            : "최근 공식전 전적이 없습니다."}
          <Statistic title="일반전" valueStyle={{ display: "none" }} />
          {checkNormalGameRecordsExist(focusedUser.records)
            ? focusedUser.records.map((checkData: WinRecords) => {
                if (checkData.gameTypeId === "normal") {
                  return focusedUser.records.map(
                    (recordsData: WinRecords, index: number) => {
                      if (recordsData.gameTypeId === "normal") {
                        return (
                          <div key={index}>
                            <FlexBox
                              style={{
                                justifyContent: "space-between",
                                width: "50%",
                              }}
                            >
                              <div>
                                <ItemTitle>승</ItemTitle>
                                {focusingUser ? (
                                  <Skeleton.Input
                                    style={{ width: "20px", height: "22px" }}
                                    active
                                    size="small"
                                  />
                                ) : (
                                  <ItemContent style={{ fontSize: "12px" }}>
                                    {recordsData.winCount}
                                  </ItemContent>
                                )}
                              </div>
                              <div>
                                <ItemTitle>패</ItemTitle>
                                {focusingUser ? (
                                  <Skeleton.Input
                                    style={{ width: "20px", height: "22px" }}
                                    active
                                    size="small"
                                  />
                                ) : (
                                  <ItemContent style={{ fontSize: "12px" }}>
                                    {recordsData.loseCount}
                                  </ItemContent>
                                )}
                              </div>
                              <div>
                                <ItemTitle>중단</ItemTitle>
                                {focusingUser ? (
                                  <Skeleton.Input
                                    style={{ width: "20px", height: "22px" }}
                                    active
                                    size="small"
                                  />
                                ) : (
                                  <ItemContent style={{ fontSize: "12px" }}>
                                    {recordsData.stopCount}
                                  </ItemContent>
                                )}
                              </div>
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
}

export default UserInfoSec;

const FlexBox = styled.div`
  display: flex;
  padding-bottom: 10px;
`;

const ItemTitle = styled.h3`
  font-size: 14px;
  color: #808080;
`;

const ItemContent = styled.span`
  font-size: 14px;
  color: #353535;
  font-weight: bold;
`;
