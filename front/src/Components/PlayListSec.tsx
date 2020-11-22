import React, { useCallback, useEffect, useState } from "react";
import { Card, Tabs } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/index";
import { getUserPlayList } from "../modules/totalCyphers";
import PlayedInfoSec from "./PlayedInfoSec";

function PlayListSec(parameter: any): JSX.Element {
  const { TabPane } = Tabs;
  const userId = parameter.parameter;
  const dispatch = useDispatch();
  const playedList = useSelector(
    (state: RootState) => state.totalCyphers.playedRecords
  );
  const [playListType, setPlayListType] = useState("normal");
  useEffect(() => {
    dispatch(getUserPlayList(userId, playListType));
  }, []);
  const onChangeTab = useCallback((key) => {
    setPlayListType(key);
  }, []);
  if (playedList) {
    return (
      <Card style={{ width: "70%" }} title="최근 경기">
        <Tabs defaultActiveKey="normal" onChange={onChangeTab}>
          <TabPane tab="일반전" key="normal"></TabPane>
          <TabPane tab="공식전" key="rating"></TabPane>
        </Tabs>
        {playedList.map((data, index) => {
          console.log(data);
          return <PlayedInfoSec data={data} key={index} />;
        })}
      </Card>
    );
  } else {
    return <div>로딩 중...</div>;
  }
}

export default PlayListSec;

const FlexBox = styled.div`
  display: flex;
  padding-bottom: 10px;
`;
