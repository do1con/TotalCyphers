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
  const [activePlayer, setActivePlayer] = useState(0);
  const [typedFullChar, setTypedFullChar] = useState("");
  const [focusing, setFocusing] = useState(false);

  const onSubmitSearchNickname = useCallback(
    (e: string) => {
      searchedPlayers.forEach((item) => {
        if (item.nickname === e) {
          location.replace(`/userInfo/${item.playerId}`);
        }
      });
    },
    [searchedPlayers]
  );

  // 디바운싱
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastTimeFunc: any;
  const onChangeSearchBar = (e: any) => {
    setTypedFullChar(e.target.value);
    if (lastTimeFunc) {
      clearTimeout(lastTimeFunc);
      lastTimeFunc = null;
    }
    lastTimeFunc = setTimeout(() => {
      setTypedFullChar(e.target.value);
      setActivePlayer(0);
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
  const onKeyUpSearchBar = (e: any) => {
    if (e.key === "ArrowUp" && activePlayer > 0) {
      e.target.value = searchedPlayers[activePlayer - 1].nickname;
      setTypedFullChar(searchedPlayers[activePlayer - 1].nickname);
      setActivePlayer(activePlayer - 1);
    }
    if (e.key === "ArrowDown" && activePlayer < 4) {
      e.target.value = searchedPlayers[activePlayer + 1].nickname;
      setTypedFullChar(searchedPlayers[activePlayer + 1].nickname);
      setActivePlayer(activePlayer + 1);
    }
  };
  return (
    <Form>
      <Form.Item>
        <Search
          // style={{ width: "250px", margin: "0 auto" }}
          style={(() => {
            const browserWidth = document.body.offsetWidth;
            if (browserWidth < 320) {
              return {
                width: "160px",
                margin: "0 auto",
              };
            }
            if (browserWidth < 420) {
              return {
                width: "200px",
                margin: "0 auto",
              };
            }
            return {
              width: "250px",
              margin: "0 auto",
            };
          })()}
          placeholder="닉네임"
          enterButton
          onSearch={onSubmitSearchNickname}
          onChange={onChangeSearchBar}
          onKeyUp={onKeyUpSearchBar}
          onFocus={() => setFocusing(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocusing(false);
            }, 100);
          }}
          value={typedFullChar}
        />
        {focusing && (
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
                      <PlayerListCard focus={activePlayer === index}>
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
        )}
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

const PlayerListCard = styled.div<{ focus?: boolean }>`
  width: 100%;
  padding: 5px 15px;
  font-size: 12px;
  background-color: ${(props) => (props.focus ? "#e6f7ff;" : "#ffffff;")}
  &:hover {
    background-color: #e6f7ff;
  }
`;

const LoadingSkeleton = () => {
  return (
    <PlayerListCard focus={false}>
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
