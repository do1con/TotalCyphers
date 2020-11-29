import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Col, Row } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { RootState } from "../modules/index";
import { getGameDetail } from "../modules/totalCyphers";
import PlayedInfoDetailRow from "./PlayedInfoDetailRow";

function PlayedInfoDefail(data: any): JSX.Element {
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
                matchDetail.matchDetail.players.map(
                  (data: any, index: number) => {
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
                <Col span="4">
                  <h3 style={{ textAlign: "center" }}>패배팀</h3>
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
                matchDetail.matchDetail.players.map(
                  (data: any, index: number) => {
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
const PlayedInfoDetailBtn = styled.div<{ win: boolean }>`
  width: 100%;
  height: 22px;
  background-color ${(props) => (props.win ? "#91d5ff" : "#ffa39e")};
  text-align: center;
  cursor: pointer
`;
