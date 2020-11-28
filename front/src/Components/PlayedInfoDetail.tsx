import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Col, Row } from "antd";
import { RootState } from "../modules/index";
import { getGameDetail } from "../modules/totalCyphers";
import tanker from "./../static/media/tanker.png";
import suppoter from "./../static/media/supporter.png";
import geun_dealer from "./../static/media/geun_dealer.png";
import one_dealer from "./../static/media/one_dealer.png";

function PlayedInfoDefail(data: any): JSX.Element {
  const matchId = data.matchId;
  const dispatch = useDispatch();
  const [matchDetail] = useSelector((state: RootState) =>
    state.totalCyphers.playedRecords.filter((data) => {
      if (data.matchId === matchId) {
        return data;
      }
    })
  );
  useEffect(() => {
    dispatch(getGameDetail(matchId));
  }, []);
  useEffect(() => {
    if (matchDetail.matchDetail) {
      console.log("데이터", matchDetail.matchDetail);
    }
  });
  const kda = (data: any) => {
    const value =
      (data.playInfo.killCount + data.playInfo.assistCount) /
      data.playInfo.deathCount;

    if (value === Infinity) {
      return "Perfect";
    }
    if (value <= 0) {
      return "0 평점";
    }
    return String(value.toFixed(2)) + " 평점";
  };
  const isWinner = (playerId: string) => {
    const winTeamNumb =
      matchDetail.matchDetail.teams[0].result === "win" ? 0 : 1;
    const result = matchDetail.matchDetail.teams[winTeamNumb].players.filter(
      (data: string) => {
        return playerId === data;
      }
    );
    return result.length >= 1;
  };
  if (matchDetail.matchDetail) {
    return (
      <div>
        <PlayedInfoWrapper win={matchDetail.playInfo.result}>
          <Row>
            <Col span="4">
              <h3 style={{ textAlign: "center" }}>승리팀</h3>
            </Col>
            <Col span="4">
              <h4 style={{ textAlign: "center" }}>K / D / A</h4>
            </Col>
            <Col span="6">
              <h4 style={{ textAlign: "center" }}>상세 기록</h4>
            </Col>
            <Col span="10">
              <h4 style={{ textAlign: "center" }}>아이템</h4>
            </Col>
          </Row>
          {matchDetail.matchDetail.players &&
            matchDetail.matchDetail.players.map((data: any, index: number) => {
              if (isWinner(data.playerId)) {
                return (
                  <Row
                    key={index}
                    style={{
                      border: "1px solid #cacaca",
                      marginTop: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <Col
                      span="4"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              borderRadius: "50% 50%",
                              overflow: "hidden",
                              margin: "5px",
                            }}
                          >
                            <img
                              src={`https://img-api.neople.co.kr/cy/characters/${data.playInfo.characterId}`}
                              width="27"
                              alt="캐릭터"
                            />
                          </div>
                          <div>
                            <img
                              src={
                                data.position.name === "탱커"
                                  ? tanker
                                  : data.position.name === "원거리딜러"
                                  ? one_dealer
                                  : data.position.name === "근거리딜러"
                                  ? geun_dealer
                                  : data.position.name === "서포터"
                                  ? suppoter
                                  : "에러"
                              }
                              alt="포지션"
                              width="20"
                            />
                          </div>
                        </div>
                        <div>
                          <span
                            style={{
                              textOverflow: "ellipsis",
                              fontSize: "12px",
                              width: "63px",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              display: "block",
                            }}
                          >
                            {data.nickname}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col
                      span="4"
                      style={{
                        display: "flex",
                        placeItems: "center",
                        alignItems: "center",
                        justifyItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          fontSize: "12px",
                          justifyItems: "center",
                          width: "93px",
                        }}
                      >
                        <div style={{ textAlign: "center" }}>
                          <span style={{ fontWeight: "bold" }}>
                            {data.playInfo.killCount}
                          </span>{" "}
                          /{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {data.playInfo.deathCount}
                          </span>{" "}
                          /{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {data.playInfo.assistCount}
                          </span>
                        </div>
                        <div style={{ textAlign: "center" }}>{kda(data)}</div>
                      </div>
                    </Col>
                    <Col span="6">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: "55px" }}>
                          <span style={{ fontSize: "12px", color: "#6f6f6f" }}>
                            공격량
                          </span>
                          <br />
                          <span
                            style={{
                              color: "#00860a",
                              fontWeight: "bold",
                              textAlign: "center",
                              fontSize: "12px",
                            }}
                          >
                            {data.playInfo.attackPoint}
                          </span>
                          <br />
                          <span style={{ fontSize: "12px", color: "#6f6f6f" }}>
                            피해량
                          </span>
                          <br />
                          <span
                            style={{
                              color: "#690000",
                              fontWeight: "bold",
                              fontSize: "12px",
                            }}
                          >
                            {data.playInfo.damagePoint}
                          </span>
                        </div>
                        <div>
                          <span style={{ fontSize: "12px", color: "#6f6f6f" }}>
                            전투 참여
                          </span>
                          <br />
                          <span
                            style={{ fontWeight: "bold", fontSize: "12px" }}
                          >
                            {data.playInfo.battlePoint}
                          </span>
                          <br />
                          <span
                            style={{
                              fontSize: "12px",
                              color: "#6f6f6f",
                            }}
                          >
                            시야 확보
                          </span>
                          <br />
                          <span
                            style={{ fontWeight: "bold", fontSize: "12px" }}
                          >
                            {data.playInfo.sightPoint}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col
                      span="10"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        {data.items.map((itemData: any, itemIndex: number) => {
                          return (
                            <div
                              style={{
                                borderRadius: "20% 20%",
                                overflow: "hidden",
                                margin: "1px",
                                textAlign: "center",
                              }}
                              key={itemIndex}
                            >
                              <img
                                src={`https://img-api.neople.co.kr/cy/items/${itemData.itemId}`}
                                width="27"
                                alt="아이템"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                );
              }
            })}
        </PlayedInfoWrapper>
        <div>
          <h3>패배팀</h3>
          {matchDetail.matchDetail.players &&
            matchDetail.matchDetail.players.map((data: any, index: number) => {
              if (!isWinner(data.playerId)) {
                return (
                  <div key={index}>
                    <span>{data.nickname}</span>
                  </div>
                );
              }
            })}
        </div>
      </div>
    );
  } else {
    return <div>로딩 중...</div>;
  }
}

export default PlayedInfoDefail;

const PlayedInfoWrapper = styled.div<{ win: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.win ? "#e6f7ff" : "#fff1f0")};
  align-items: center;
  position: relative;
  padding: 10px;
`;
