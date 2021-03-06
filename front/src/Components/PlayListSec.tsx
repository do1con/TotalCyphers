import React, { useCallback, useEffect, useState } from "react";
import { Card, Tabs, Button, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/index";
import { getUserPlayList } from "../modules/totalCyphers";
import PlayedInfoSec from "./PlayedInfoSec";

function PlayListSec(parameter: { parameter: string }): JSX.Element {
  const { TabPane } = Tabs;
  const dateFormat = "YYYY-MM-DD" as const;
  const today = moment().format(dateFormat);
  const before30daysAgo = moment().add(-90, "days").format(dateFormat);
  const userId = parameter.parameter;
  const dispatch = useDispatch();
  const playedList = useSelector(
    (state: RootState) => state.totalCyphers.playedRecords
  );
  const { gettingUserPlaylist } = useSelector(
    (state: RootState) => state.totalCyphers
  );
  const [playListType, setPlayListType] = useState("normal");
  const [showLimit, setShowLimit] = useState(10);
  const [isLastRecord, setIsLastRecord] = useState(false);
  useEffect(() => {
    dispatch(getUserPlayList(userId, playListType, before30daysAgo, today));
  }, []);
  useEffect(() => {
    dispatch(getUserPlayList(userId, playListType, before30daysAgo, today));
  }, [playListType]);
  useEffect(() => {
    dispatch(getUserPlayList(userId, playListType, before30daysAgo, today));
  }, [parameter]);
  const onChangeTab = useCallback(
    (key) => {
      setPlayListType(key);
      setShowLimit(10);
      setIsLastRecord(false);
    },
    [setPlayListType, setShowLimit, setIsLastRecord]
  );
  const onClickShowMore = useCallback(() => {
    setShowLimit(showLimit + 10);
    if (playedList.length - 1 < showLimit + 10) {
      setIsLastRecord(true);
    }
  }, [showLimit, setShowLimit, setIsLastRecord, playedList]);
  return (
    <PlayedListWrapper>
      <Card
        title={
          <span className="ㅇㅇ">
            최근 경기{" "}
            <Popover
              content={"오늘부터 90일 전까지 최대 100개의 전적이 조회됩니다."}
            >
              <InfoCircleOutlined />
            </Popover>
          </span>
        }
      >
        <Tabs defaultActiveKey="normal" onChange={onChangeTab}>
          <TabPane tab="일반전" key="normal"></TabPane>
          <TabPane tab="공식전" key="rating"></TabPane>
        </Tabs>
        {gettingUserPlaylist ? (
          <>
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
            <PlayedInfoSec loading={gettingUserPlaylist} />
          </>
        ) : (
          playedList.map((data, index) => {
            if (index <= showLimit) {
              return (
                <PlayedInfoSec
                  data={data}
                  key={index}
                  loading={gettingUserPlaylist}
                />
              );
            }
          })
        )}
        {playedList.length <= 0 && (
          <div style={{ padding: "10px" }}>
            최근 90일간 플레이하지 않았거나 전적갱신이 되지 않았습니다.
          </div>
        )}
        {!isLastRecord ? (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Button onClick={onClickShowMore}>더 보기</Button>
          </div>
        ) : (
          "조회할 수 있는 마지막 경기입니다."
        )}
      </Card>
    </PlayedListWrapper>
  );
}

export default PlayListSec;

const PlayedListWrapper = styled.div`
  width: 70%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
