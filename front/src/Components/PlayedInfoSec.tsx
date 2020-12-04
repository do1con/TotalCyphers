import React, { useCallback } from "react";
import styled from "styled-components";
import { Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import tanker from "./../static/media/tanker.png";
import suppoter from "./../static/media/supporter.png";
import geun_dealer from "./../static/media/geun_dealer.png";
import one_dealer from "./../static/media/one_dealer.png";
import map_riverford from "./../static/media/map_riverford.png";
import map_bristol from "./../static/media/map_bristol.png";
import map_eindhoven from "./../static/media/map_eindhoven.png";
import map_grandflam from "./../static/media/map_grandflam.png";
import map_metropolis from "./../static/media/map_metropolis.png";
import map_springfield from "./../static/media/map_springfield.png";
import PlayedInfoDefail from "./PlayedInfoDetail";

type GameData = {
  date: string;
  map: { mapId: string; name: string };
  matchId: string;
  playInfo: {
    assistCount: number;
    attackPoint: number;
    backAttackCount: number;
    battlePoint: number;
    characterId: string;
    characterName: string;
    comboCount: number;
    damagePoint: number;
    deathCount: number;
    demolisherKillCount: number;
    getCoin: number;
    guardTowerKillCount: number;
    guardianKillCount: number;
    healAmount: number;
    killCount: number;
    level: number;
    maxLifeTime: number;
    minLifeTime: number;
    partyInfo?: Array<{
      playerId: string;
      nickname: string;
      characterName: string;
      characterId: string;
    }>;
    partyUserCount: number;
    playTime: number;
    playTypeName: string;
    random: boolean;
    responseTime: number;
    result: string;
    sentinelKillCount: number;
    sightPoint: number;
    spellCount: number;
    spendCoin: number;
    spendConsumablesCount: number;
    towerAttackPoint: number;
    trooperKillCount: number;
  };
  position: {
    attribute: Array<{
      level: number;
      id: string;
      name: string;
    }>;
    explain: string;
    name: string;
  };
};

function PlayedInfoSec(data: { data: GameData }): JSX.Element {
  const info: GameData = data.data;
  const kda = (): string => {
    const value =
      (info.playInfo.killCount + info.playInfo.assistCount) /
      info.playInfo.deathCount;

    if (value === Infinity) {
      return "Perfect";
    }
    if (value <= 0) {
      return "0 평점";
    }
    return String(value.toFixed(2)) + " 평점";
  };
  const getDateDiffer = useCallback(() => {
    const strArr = info.date.split("-");
    const dateArr = strArr[2].split(" ");
    const timeArr = dateArr[1].split(":");
    const matchYear = Number(strArr[0]);
    const matchMonth = Number(strArr[1]);
    const matchDate = Number(dateArr[0]);
    const matchHours = Number(timeArr[0]);
    const matchMinute = Number(timeArr[1]);
    const today = new Date();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth() + 1;
    const todayDate: number = today.getDate();
    const todayHours: number = today.getHours();
    const todayMinute: number = today.getMinutes();
    if (todayYear > matchYear) {
      return `${todayYear - matchYear}년 전`;
    }
    if (todayMonth > matchMonth) {
      return `${todayMonth - matchMonth}개월 전`;
    }
    if (todayDate > matchDate) {
      return `${todayDate - matchDate}일 전`;
    }
    if (todayHours > matchHours) {
      return `${todayHours - matchHours}시간 전`;
    }
    if (todayMinute > matchMinute) {
      return `${todayMinute - matchMinute}분 전`;
    }
  }, [info.date]);
  if (info.playInfo) {
    return (
      <div style={{ marginBottom: "10px" }}>
        <PlayedInfoWrapper win={info.playInfo.result === "win"}>
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "75px",
              textAlign: "center",
              fontSize: "12px",
            }}
          >
            <Popover content={info.date}>
              <InfoCircleOutlined />
              <span>&nbsp;{getDateDiffer()}</span>
            </Popover>
          </div>
          <div
            style={{
              height: "101px",
              position: "absolute",
              zIndex: 1,
            }}
          >
            <BackgroundWinSpan>
              {info.playInfo.result.toUpperCase()}
            </BackgroundWinSpan>
          </div>
          <div style={{ position: "relative", zIndex: 2 }}>
            <div
              style={{
                borderRadius: "50% 50%",
                overflow: "hidden",
                margin: "10px",
              }}
            >
              <img
                src={`https://img-api.neople.co.kr/cy/characters/${info.playInfo.characterId}`}
                alt="캐릭터"
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {info.playInfo.characterName}
              </span>
            </div>
          </div>
          <div
            style={{
              overflow: "hidden",
              margin: "10px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <img
              src={
                info.position.name === "탱커"
                  ? tanker
                  : info.position.name === "원거리딜러"
                  ? one_dealer
                  : info.position.name === "근거리딜러"
                  ? geun_dealer
                  : info.position.name === "서포터"
                  ? suppoter
                  : "에러"
              }
              alt="포지션"
              width="25"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: "12px", color: "#6f6f6f" }}>
                K / D / A
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontWeight: "bold" }}>
                {info.playInfo.killCount}
              </span>{" "}
              /{" "}
              <span style={{ fontWeight: "bold" }}>
                {info.playInfo.deathCount}
              </span>{" "}
              /{" "}
              <span style={{ fontWeight: "bold" }}>
                {info.playInfo.assistCount}
              </span>
            </div>
            <div style={{ textAlign: "center" }}>{kda()}</div>
          </div>
          <PointPresenterWrapper>
            <span style={{ fontSize: "12px", color: "#6f6f6f" }}>공격량</span>
            <br />
            <span style={{ color: "#00860a", fontWeight: "bold" }}>
              {info.playInfo.attackPoint}
            </span>
            <br />
            <span style={{ fontSize: "12px", color: "#6f6f6f" }}>피해량</span>
            <br />
            <span style={{ color: "#690000", fontWeight: "bold" }}>
              {info.playInfo.damagePoint}
            </span>
          </PointPresenterWrapper>
          <div style={{ margin: "10px", position: "relative", zIndex: 3 }}>
            {info.position.attribute.map(
              (
                data: {
                  level: number;
                  id: string;
                  name: string;
                },
                index: number
              ) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                  }}
                  key={index}
                >
                  <div>
                    <img
                      src={`https://img-api.neople.co.kr/cy/position-attributes/${data.id}`}
                      alt="특성"
                      width="27"
                      style={{
                        borderRadius: "25% 25%",
                      }}
                    />
                    <CharacteristicSpan>&nbsp;{data.name}</CharacteristicSpan>
                  </div>
                </div>
              )
            )}
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              marginLeft: "auto",
              right: "0",
            }}
          >
            <MapImage
              src={
                info.map.mapId === "101"
                  ? map_riverford
                  : info.map.mapId === "102"
                  ? map_metropolis
                  : info.map.mapId === "103"
                  ? map_bristol
                  : info.map.mapId === "104"
                  ? map_springfield
                  : info.map.mapId === "105"
                  ? map_grandflam
                  : info.map.mapId === "106"
                  ? map_eindhoven
                  : ".."
              }
              alt="맵"
              height="101"
            />
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                background: `linear-gradient(60deg, ${
                  info.playInfo.result === "win"
                    ? "rgba(186, 231, 255, 1)"
                    : "rgba(255, 204, 199, 1)"
                }30%, rgba(255,255,255,0))`,
              }}
            >
              <MapPresenterWrapper>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    lineHeight: "30px",
                  }}
                >
                  {info.map.name === "그랑플람 아시아 지부"
                    ? "그랑플람"
                    : info.map.name}
                </span>
              </MapPresenterWrapper>
            </div>
          </div>
        </PlayedInfoWrapper>
        <PlayedInfoDefail matchId={info.matchId} />
      </div>
    );
  } else {
    return <div>정보를 받아오는 중입니다.</div>;
  }
}

export default PlayedInfoSec;

const PlayedInfoWrapper = styled.div<{ win: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.win ? "#bae7ff" : "#ffccc7")};
  display: flex;
  align-items: center;
  position: relative;
  height: 101px;
`;

const PointPresenterWrapper = styled.div`
  width: 80px;
  position: relative;
  z-index: 2;
  text-align: center;
  @media (max-width: 767px) {
    display: none;
  }
`;

const MapPresenterWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100px;
  height: 30px;
  text-align: center;
  @media (max-width: 767px) {
    display: none;
  }
`;

const MapImage = styled.img`
  height: 101px;
  @media (max-width: 767px) {
    display: none;
  }
`;

const CharacteristicSpan = styled.span`
  font-size: 12px;
  @media (max-width: 710px) {
    display: none;
  }
`;

const BackgroundWinSpan = styled.span`
  font-weight: bolder;
  font-size: 155px;
  line-height: 0.5;
  color: #ffffff;
  opacity: 0.5;
  display: block;
  overflow-y: hidden;
  overflow-x: visible;
  height: 101px;
  @media (min-width: 530px) and (max-width: 600px) {
    font-size: 130px;
  }
  @media (max-width: 529px) {
    font-size: 110px;
  }
`;
