import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { Popover } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../modules/index";
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

function PlayedInfoSec(data: any): JSX.Element {
  const info = data.data;
  const kda = () => {
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
            <span
              style={{
                fontWeight: "bolder",
                fontSize: "155px",
                lineHeight: "0.5",
                color: "#ffffff",
                opacity: "0.5",
                display: "block",
                overflowY: "hidden",
                overflowX: "visible",
                height: "101px",
              }}
            >
              {info.playInfo.result.toUpperCase()}
            </span>
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
          <div
            style={{
              width: "80px",
              position: "relative",
              zIndex: 2,
              textAlign: "center",
            }}
          >
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
          </div>
          <div style={{ margin: "10px", position: "relative", zIndex: 3 }}>
            {info.position.attribute.map((data: any, index: number) => (
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
                  <span style={{ fontSize: "12px" }}>&nbsp;{data.name}</span>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              marginLeft: "auto",
              right: "0",
            }}
          >
            <img
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
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  width: "100px",
                  height: "30px",
                  textAlign: "center",
                }}
              >
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
              </div>
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
`;
