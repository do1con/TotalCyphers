import React, { useEffect } from "react";
import styled from "styled-components";
import tanker from "./../static/media/tanker.png";
import suppoter from "./../static/media/supporter.png";
import geun_dealer from "./../static/media/geun_dealer.png";
import one_dealer from "./../static/media/one_dealer.png";

function PlayedInfoSec(data: any): JSX.Element {
  const info = data.data;
  useEffect(() => {
    console.log(info);
  });
  const kda = () => {
    const value =
      (info.playInfo.killCount + info.playInfo.assistCount) /
      info.playInfo.deathCount;

    if (value === Infinity) {
      return "Perfect";
    }
    if (value <= 0) {
      return 0;
    }
    return value.toFixed(2);
  };
  return (
    <PlayedInfoWrapper win={info.playInfo.result === "win"}>
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
          <span style={{ fontSize: "14px" }}>
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
              : ""
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
          <span style={{ fontSize: "12px", color: "#6f6f6f" }}>K / D / A</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontWeight: "bold" }}>{info.playInfo.killCount}</span>{" "}
          /{" "}
          <span style={{ fontWeight: "bold" }}>{info.playInfo.deathCount}</span>{" "}
          /{" "}
          <span style={{ fontWeight: "bold" }}>
            {info.playInfo.assistCount}
          </span>
        </div>
        <div style={{ textAlign: "center" }}>{kda()} 평점</div>
      </div>
      <div style={{ margin: "10px", position: "relative", zIndex: 2 }}>
        {info.position.attribute.map((data: any, index: number) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "25% 25%",
              overflow: "hidden",
            }}
            key={index}
          >
            <img
              src={`https://img-api.neople.co.kr/cy/position-attributes/${data.id}`}
              alt="특성"
              width="27"
            />
          </div>
        ))}
      </div>
    </PlayedInfoWrapper>
  );
}

export default PlayedInfoSec;

const PlayedInfoWrapper = styled.div<{ win: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.win ? "#bae7ff" : "#ffccc7")};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
  height: 101px;
`;
