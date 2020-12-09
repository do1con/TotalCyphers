import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import UserInfoSec from "../Components/UserInfoSec";
import PlayListSec from "../Components/PlayListSec";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/index";
import { setCurrentUrl } from "../modules/totalCyphers";

function UserInfo(): JSX.Element {
  const parameter: { userId: string } = useParams();
  const currentUrl = useSelector(
    (state: RootState) => state.totalCyphers.currentUrl
  );
  // eslint-disable-next-line prefer-const
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentUrl(window.location.pathname));
  }, []);
  useEffect(() => {
    dispatch(setCurrentUrl(window.location.pathname));
  }, [currentUrl]);
  return (
    <BodyWrapper>
      <UserInfoSec parameter={parameter.userId} />
      <PlayListSec parameter={parameter.userId} />
    </BodyWrapper>
  );
}

export default UserInfo;

const BodyWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: flex;
  padding: 50px;
  justify-content: space-between;
  @media (min-width: 650px) and (max-width: 767px) {
    width: 80%;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media (min-width: 480px) and (max-width: 649px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    padding: 30px;
  }
  @media (max-width: 479px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
  }
`;
