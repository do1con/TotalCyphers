import React, { useEffect } from "react";
import styled from "styled-components";
import tanker from "./../static/media/tanker.png";
import suppoter from "./../static/media/supporter.png";
import geun_dealer from "./../static/media/geun_dealer.png";
import one_dealer from "./../static/media/one_dealer.png";

function PlayedInfoSec(data: any) {
  const info = data.data;
  useEffect(() => {
    console.log(info);
  });
  return (
    <PlayedInfoWrapper win={info.playInfo.result === "win"}>
      <div
        style={{ borderRadius: "50% 50%", overflow: "hidden", margin: "10px" }}
      >
        <img
          src={`https://img-api.neople.co.kr/cy/characters/${info.playInfo.characterId}`}
          alt="캐릭터"
        />
      </div>
      <div
        style={{
          overflow: "hidden",
          margin: "10px",
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
      <div style={{ margin: "10px" }}>
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
      <div style={{ margin: "10px", display: "flex", flexDirection: "column" }}>
        <div>
          <span
            style={{ fontSize: "12px", color: "#6f6f6f", textAlign: "center" }}
          >
            K / D / A
          </span>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>{info.playInfo.killCount}</span>{" "}
          /{" "}
          <span style={{ fontWeight: "bold" }}>{info.playInfo.deathCount}</span>{" "}
          /{" "}
          <span style={{ fontWeight: "bold" }}>
            {info.playInfo.assistCount}
          </span>
        </div>
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
`;
