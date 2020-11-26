import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/index";
import { getGameDetail } from "../modules/totalCyphers";

function PlayedInfoDefail(data: any): JSX.Element {
  const matchId = data.matchId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGameDetail(matchId));
    console.log("디테일", matchId);
  }, []);
  return (
    <div>
      <span>ㅇddsadㅇ</span>
    </div>
  );
}

export default PlayedInfoDefail;
