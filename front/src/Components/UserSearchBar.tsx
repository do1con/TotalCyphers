import React, { useCallback, useEffect, useState } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  searchUserByNickname,
  resetSearchUserList,
} from "../modules/totalCyphers";
import { RootState } from "../modules/index";

function UserSearchBar(): JSX.Element {
  useEffect(() => {
    dispatch(resetSearchUserList);
  }, []);
  const { Search } = Input;
  const dispatch = useDispatch();

  const searchedPlayers = useSelector(
    (state: RootState) => state.totalCyphers.searchedPlayers
  );

  const onSubmitSearchNickname = useCallback(
    (e: string) => {
      dispatch(searchUserByNickname(e));
    },
    [dispatch, searchUserByNickname]
  );

  // 디바운싱
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastTimeFunc: any;
  const onChangeSearchBar = (e: any) => {
    if (lastTimeFunc) {
      clearTimeout(lastTimeFunc);
      lastTimeFunc = null;
    }
    lastTimeFunc = setTimeout(() => {
      dispatch(searchUserByNickname(e.target.value));
    }, 300);
  };
  return (
    <Form>
      <Form.Item>
        <Search
          style={{ width: "300px", margin: "0 auto" }}
          placeholder="닉네임"
          enterButton
          onSearch={onSubmitSearchNickname}
          onChange={onChangeSearchBar}
        />
        <SearchedList>
          {searchedPlayers.length > 0 &&
            searchedPlayers.map((data, index) => {
              if (index < 6) {
                return (
                  <Link to={`/userInfo/${data.playerId}`} key={index}>
                    <PlayerListCard>
                      <span>{data.nickname}</span>
                      <span style={{ float: "right", color: "#9f9f9f" }}>
                        {data.grade} 급
                      </span>
                    </PlayerListCard>
                  </Link>
                );
              }
            })}
        </SearchedList>
      </Form.Item>
    </Form>
  );
}

export default UserSearchBar;

const SearchedList = styled.div`
  display: block;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 2px 8px #cfcfcf;
  position: relative;
  z-index: 3;
`;

const PlayerListCard = styled.div`
  width: 100%;
  padding: 5px 15px;
  font-size: 12px;
  background-color: #ffffff;
  &:hover {
    background-color: #e6f7ff;
  }
`;
