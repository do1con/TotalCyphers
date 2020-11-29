import React from "react";
import { Row, Col, Popover } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUrl } from "../modules/totalCyphers";
import tanker from "./../static/media/tanker.png";
import suppoter from "./../static/media/supporter.png";
import geun_dealer from "./../static/media/geun_dealer.png";
import one_dealer from "./../static/media/one_dealer.png";

function PlayedInfoDetailRow(infoData: any, index: number): JSX.Element {
  const data = infoData.infoData;
  const dispatch = useDispatch();
  const kda = (data: any) => {
    const value =
      (data.playInfo.killCount + data.playInfo.assistCount) /
      data.playInfo.deathCount;

    if (value === Infinity) {
      return "Perfect";
    }
    if (value <= 0) {
      return "0 평점";
    }
    return String(value.toFixed(2)) + " 평점";
  };
  React.useEffect(() => {
    // console.log("데이터", data);
    // console.log("데이터", infoData);
  });
  return (
    <Row
      key={index}
      style={{
        marginTop: "5px",
        marginBottom: "5px",
        backgroundColor: "rgb(255 255 255 / 0.5)",
      }}
    >
      <Col
        span="4"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                borderRadius: "50% 50%",
                overflow: "hidden",
                margin: "5px",
              }}
            >
              <img
                src={`https://img-api.neople.co.kr/cy/characters/${data.playInfo.characterId}`}
                width="27"
                alt="캐릭터"
              />
            </div>
            <div>
              <img
                src={
                  data.position.name === "탱커"
                    ? tanker
                    : data.position.name === "원거리딜러"
                    ? one_dealer
                    : data.position.name === "근거리딜러"
                    ? geun_dealer
                    : data.position.name === "서포터"
                    ? suppoter
                    : "에러"
                }
                alt="포지션"
                width="20"
              />
            </div>
          </div>
          <div>
            <Link
              to={`/userInfo/${data.playerId}`}
              onClick={(e: any) => {
                dispatch(setCurrentUrl(`/userInfo/${data.playerId}`));
              }}
            >
              <span
                style={{
                  textOverflow: "ellipsis",
                  fontSize: "12px",
                  width: "63px",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "block",
                  color: "#000000d9",
                }}
              >
                {data.nickname}
              </span>
            </Link>
          </div>
        </div>
      </Col>
      <Col
        span="4"
        style={{
          display: "flex",
          placeItems: "center",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "12px",
            justifyItems: "center",
            width: "93px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontWeight: "bold" }}>
              {data.playInfo.killCount}
            </span>{" "}
            /{" "}
            <span style={{ fontWeight: "bold" }}>
              {data.playInfo.deathCount}
            </span>{" "}
            /{" "}
            <span style={{ fontWeight: "bold" }}>
              {data.playInfo.assistCount}
            </span>
          </div>
          <div style={{ textAlign: "center" }}>{kda(data)}</div>
        </div>
      </Col>
      <Col span="6">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "55px" }}>
            <span style={{ fontSize: "12px", color: "#6f6f6f" }}>공격량</span>
            <br />
            <span
              style={{
                color: "#00860a",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              {data.playInfo.attackPoint}
            </span>
            <br />
            <span style={{ fontSize: "12px", color: "#6f6f6f" }}>피해량</span>
            <br />
            <span
              style={{
                color: "#690000",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {data.playInfo.damagePoint}
            </span>
          </div>
          <div>
            <span style={{ fontSize: "12px", color: "#6f6f6f" }}>
              전투 참여
            </span>
            <br />
            <span style={{ fontWeight: "bold", fontSize: "12px" }}>
              {data.playInfo.battlePoint}
            </span>
            <br />
            <span
              style={{
                fontSize: "12px",
                color: "#6f6f6f",
              }}
            >
              시야 확보
            </span>
            <br />
            <span style={{ fontWeight: "bold", fontSize: "12px" }}>
              {data.playInfo.sightPoint}
            </span>
          </div>
        </div>
      </Col>
      <Col span="10" style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {data.items.map((itemData: any, itemIndex: number) => {
            return (
              <Popover
                title={itemData.itemName}
                content={itemData.slotName}
                key={itemIndex}
              >
                <div
                  style={{
                    borderRadius: "20% 20%",
                    overflow: "hidden",
                    margin: "1px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={`https://img-api.neople.co.kr/cy/items/${itemData.itemId}`}
                    width="27"
                    alt="아이템"
                  />
                </div>
              </Popover>
            );
          })}
        </div>
      </Col>
    </Row>
  );
}

export default PlayedInfoDetailRow;
