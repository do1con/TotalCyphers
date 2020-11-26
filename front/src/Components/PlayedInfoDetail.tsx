import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../modules/index";
import { getGameDetail } from "../modules/totalCyphers";

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
      <PlayedInfoWrapper win={matchDetail.playInfo.result === "win"}>
        <div>
          <h3>승리팀</h3>
          {matchDetail.matchDetail.players &&
            matchDetail.matchDetail.players.map((data: any, index: number) => {
              if (isWinner(data.playerId)) {
                return (
                  <div key={index}>
                    <span>{data.nickname}</span>
                  </div>
                );
              }
            })}
        </div>
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
      </PlayedInfoWrapper>
    );
  } else {
    return <div>로딩 중...</div>;
  }
}

export default PlayedInfoDefail;

const PlayedInfoWrapper = styled.div<{ win: boolean }>`
  width: 100%;
  background-color: ${(props) => (props.win ? "#e6f7ff" : "#fff1f0")};
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
`;
