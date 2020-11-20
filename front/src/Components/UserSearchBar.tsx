import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { searchUserByNickname } from "../modules/totalCyphers";
import { RootState } from "../modules/index";
import loading from "../static/media/loading.gif";

type ListProps = {
  showStatus: boolean;
};

function UserSearchBar(): JSX.Element {
  const { Search } = Input;
  const dispatch = useDispatch();

  const searchedPlayers = useSelector(
    (state: RootState) => state.totalCyphers.searchedPlayers
  );
  const [focusedBar, setFocusedBar] = useState(false);

  useEffect(() => {
    console.log("searchBar", searchedPlayers);
    console.log("searchBar", focusedBar);
  });

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
            "Searching..."
          ) : (
            <img src={loading} alt="검색중..." width="100" />
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
  height: 100%;
  background-color: coral;
`;
