import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Col, Row } from "antd";
import { DownOutlined, UpOutlined, LoadingOutlined } from "@ant-design/icons";
import { RootState } from "../modules/index";
import { getGameDetail } from "../modules/totalCyphers";
import PlayedInfoDetailRow from "./PlayedInfoDetailRow";

export type PlayerInfo = {
  items: Array<{
    itemId: string;
    itemName: string;
    slotCode: string;
    slotName: string;
    rarityCode: string;
    rarityName: string;
    equipSlotCode: string;
    equipSlotName: string;
  }>;
  map: {
    mapId: string;
    name: string;
  };
  nickname: string;
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
  playerId: string;
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

function PlayedInfoDefail(data: {
  matchId: string;
  loading: boolean;
}): JSX.Element {
  const matchId = data.matchId;
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [matchDetail] = useSelector((state: RootState) =>
    state.totalCyphers.playedRecords.filter((data) => {
      if (data.matchId === matchId) {
        return data;
      }
    })
  );
  const onClickShowBtn = useCallback(() => {
    if (!showDetail) {
      dispatch(getGameDetail(matchId));
    }
    setShowDetail(!showDetail);
  }, [showDetail, setShowDetail, dispatch, getGameDetail, matchId]);
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
        <PlayedInfoDetailBtn
          win={matchDetail.playInfo.result === "win"}
          onClick={onClickShowBtn}
        >
          {showDetail ? (
            <UpOutlined style={{ margin: "0 auto" }} />
          ) : (
            <DownOutlined style={{ margin: "0 auto" }} />
          )}
        </PlayedInfoDetailBtn>
        {showDetail && (
          <div>
            <PlayedInfoWrapper win={matchDetail.playInfo.result}>
              <Row>
                <Col xs={10} md={4}>
                  <ColTitleH3>승리팀</ColTitleH3>
                </Col>
                <Col xs={6} md={4}>
                  <ColTitleH4>K / D / A</ColTitleH4>
                </Col>
                <Col xs={8} md={6}>
                  <ColTitleH4>상세 기록</ColTitleH4>
                </Col>
                <Col xs={0} md={10}>
                  <ColTitleH4>아이템</ColTitleH4>
                </Col>
              </Row>
              {matchDetail.matchDetail.players &&
                matchDetail.matchDetail.players.map(
                  (data: PlayerInfo, index: number) => {
                    if (isWinner(data.playerId)) {
                      return (
                        <PlayedInfoDetailRow
                          key={index}
                          infoData={data}
                          setShowState={setShowDetail}
                        />
                      );
                    }
                  }
                )}
            </PlayedInfoWrapper>
            <PlayedInfoWrapper win={!matchDetail.playInfo.result}>
              <Row>
                <Col xs={10} md={4}>
                  <ColTitleH3>패배팀</ColTitleH3>
                </Col>
                <Col xs={6} md={4}>
                  <ColTitleH4>K / D / A</ColTitleH4>
                </Col>
                <Col xs={8} md={6}>
                  <ColTitleH4>상세 기록</ColTitleH4>
                </Col>
                <Col xs={0} md={10}>
                  <ColTitleH4>아이템</ColTitleH4>
                </Col>
              </Row>
              {matchDetail.matchDetail.players &&
                matchDetail.matchDetail.players.map(
                  (data: PlayerInfo, index: number) => {
                    if (!isWinner(data.playerId)) {
                      return (
                        <PlayedInfoDetailRow
                          key={index}
                          infoData={data}
                          setShowState={setShowDetail}
                        />
                      );
                    }
                  }
                )}
            </PlayedInfoWrapper>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <PlayedInfoDetailBtn
          win={matchDetail.playInfo.result === "win"}
          onClick={onClickShowBtn}
        >
          {showDetail ? (
            <LoadingOutlined style={{ margin: "0 auto" }} />
          ) : (
            <DownOutlined style={{ margin: "0 auto" }} />
          )}
        </PlayedInfoDetailBtn>
      </div>
    );
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
export const PlayedInfoDetailBtn = styled.div<{ win: boolean }>`
  width: 100%;
  height: 22px;
  background-color ${(props) => (props.win ? "#91d5ff" : "#ffa39e")};
  text-align: center;
  cursor: pointer
`;
const ColTitleH3 = styled.h3`
  text-align: center;
  @media (max-width: 530px) {
    font-size: 10px;
  }
`;
const ColTitleH4 = styled.h4`
  @media (max-width: 530px) {
    font-size: 8px;
  }
`;
