import React, { useCallback, useState } from "react";
import { Form, Input, Spin, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { searchUserByNickname } from "../modules/totalCyphers";
import { RootState } from "../modules/index";
type ListProps = {
  showStatus?: boolean;
  focusStatus?: boolean | number;
  key?: number;
};

function UserSearchBar(): JSX.Element {
  React.useEffect(() => {
    console.log("서플", searchedPlayers);
    console.log("서플랭스", searchedPlayers.length);
  });
  const { Search } = Input;
  const dispatch = useDispatch();

  const searchedPlayers = useSelector(
    (state: RootState) => state.totalCyphers.searchedPlayers
  );
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
    }, 300);
  };
  const onClickUser = () => {
    console.log("클릭드");
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
                  <Link
                    to={`/userInfo/${data.playerId}`}
                    key={index}
                    onClick={onClickUser}
                  >
                    <PlayerListCard focusStatus={focusedUser === index}>
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
`;

const PlayerListCard = styled.div<ListProps>`
  width: 100%;
  padding: 5px 15px;
  font-size: 12px;
  &:hover {
    box-shadow: 0 0px 8px #afafaf;
  }
`;
