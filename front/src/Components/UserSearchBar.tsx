import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Form, Input, Spin, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { searchUserByNickname } from "../modules/totalCyphers";
import { RootState } from "../modules/index";
type ListProps = {
  showStatus?: boolean;
  focusStatus?: boolean | number;
  key?: number;
};

function UserSearchBar(): JSX.Element {
  const { Search } = Input;
  const dispatch = useDispatch();

  const searchedPlayers = useSelector(
    (state: RootState) => state.totalCyphers.searchedPlayers
  );
  const [focusedBar, setFocusedBar] = useState(false);
  const [focusedUser, setFocusedUser] = useState(1);

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
      setFocusedBar(true);
    }, 1000);
  };

  return (
    <Form>
      <Form.Item>
        <Search
          style={{ width: "300px", margin: "0 auto" }}
          placeholder="닉네임"
          enterButton
          onSearch={onSubmitSearchNickname}
          onFocus={(e) => {
            console.log("e", e);
            if (e.target.value !== "") {
              setFocusedBar(true);
            }
          }}
          onBlur={() => setFocusedBar(false)}
          onChange={onChangeSearchBar}
        />
        <SearchedList showStatus={focusedBar}>
          {searchedPlayers.length > 0 ? (
            searchedPlayers.map((data, index) => {
              if (index < 6) {
                return (
                  <PlayerListCard
                    key={index}
                    focusStatus={focusedUser === index}
                  >
                    <span>{data.nickname}</span>
                    <span style={{ float: "right", color: "#9f9f9f" }}>
                      {data.grade} 급
                    </span>
                  </PlayerListCard>
                );
              }
            })
          ) : (
            <Spin
              style={{
                display: "block",
                margin: "0 auto",
                padding: "20px 0px",
              }}
            />
          )}
        </SearchedList>
      </Form.Item>
    </Form>
  );
}

export default UserSearchBar;

const SearchedList = styled.div<ListProps>`
  display: ${(props: any) => (props.showStatus ? "block" : "none")};
  width: 100%;
  box-shadow: 0 2px 8px #cfcfcf;
  cursor: pointer;
`;

const PlayerListCard = styled.div<ListProps>`
  width: 100%;
  padding: 5px 15px;
  font-size: 12px;
  &:hover {
    box-shadow: 0 0px 8px #afafaf;
  }
`;
