import React, { useEffect } from "react";
import styled from "styled-components";

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
      어쩌구저쩌구
    </PlayedInfoWrapper>
  );
}

export default PlayedInfoSec;

const PlayedInfoWrapper = styled.div<{ win: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.win ? "#bae7ff" : "#ffccc7")};
  display: flex;
  align-items: center;
`;
