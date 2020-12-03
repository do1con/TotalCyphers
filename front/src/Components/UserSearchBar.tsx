import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  searchUserByNickname,
  resetSearchUserList,
  searchedPlayersReset,
} from "../modules/totalCyphers";
import { RootState } from "../modules/index";

function UserSearchBar(): JSX.Element {
  useEffect(() => {
    dispatch(resetSearchUserList);
  }, []);
  const { Search } = Input;
  const dispatch = useDispatch();

  const { searchedPlayers, searchingUser } = useSelector(
    (state: RootState) => state.totalCyphers
  );
  const [typedOneChar, setTypedOneChar] = useState(false);

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
      console.log("디바운싱");
      if (e.target.value.length === 1) {
        dispatch(searchedPlayersReset);
        setTypedOneChar(true);
        return;
      }
      if (e.target.value !== "") {
        dispatch(searchUserByNickname(e.target.value));
        setTypedOneChar(false);
        return;
      }
      if (e.target.value === "") {
        dispatch(searchedPlayersReset);
        setTypedOneChar(false);
        return;
      }
    }, 400);
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
          {searchingUser && (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          )}
          {typedOneChar && (
            <span style={{ display: "block", padding: "5px" }}>
              최소 두 글자가 필요합니다.
            </span>
          )}
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

const LoadingSkeleton = () => {
  return (
    <PlayerListCard>
      <Skeleton.Input
        style={{ width: "50px", height: "16px" }}
        active
        size="small"
      />
      <span style={{ float: "right" }}>
        <Skeleton.Input
          style={{ width: "40px", height: "16px" }}
          active
          size="small"
        />
      </span>
    </PlayerListCard>
  );
};
