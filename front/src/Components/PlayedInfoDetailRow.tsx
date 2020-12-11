import React, { useState, useLayoutEffect } from "react";
import { Row, Col, Popover, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setCurrentUrl } from "../modules/totalCyphers";
import tanker from "./../static/media/tanker.png";
import suppoter from "./../static/media/supporter.png";
import geun_dealer from "./../static/media/geun_dealer.png";
import one_dealer from "./../static/media/one_dealer.png";
import { PlayerInfo } from "./PlayedInfoDetail";

type ItemData = {
  itemId: string;
  itemName: string;
  slotCode: string;
  slotName: string;
  rarityCode: string;
  rarityName: string;
  equipSlotCode: string;
  equipSlotName: string;
};

function PlayedInfoDetailRow(infoData: {
  infoData: PlayerInfo;
  setShowState: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const data = infoData.infoData;
  const dispatch = useDispatch();
  const kda = (data: PlayerInfo) => {
    const value =
      (data.playInfo.killCount + data.playInfo.assistCount) /
      data.playInfo.deathCount;

    if (value === Infinity) {
      return "Perfect";
    }
    if (value <= 0) {
      return "0 평점";
    }
    return String(value.toFixed(2));
  };
  // 커스텀 훅
  const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  };
  const [width] = useWindowSize();

  // 아이템 보기 클릭시 모달
  function itemInfo(itemdatas: Array<ItemData>) {
    Modal.info({
      title: "이미지를 클릭하면 아이템정보를 볼 수 있습니다.",
      content: (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {itemdatas.map((itemData: ItemData, itemIndex: number) => {
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
                    width="30"
                    alt="아이템"
                  />
                </div>
              </Popover>
            );
          })}
        </div>
      ),
    });
  }
  return (
    <Row
      style={{
        marginTop: "5px",
        marginBottom: "5px",
        backgroundColor: "rgb(255 255 255 / 0.5)",
      }}
    >
      <Col
        xs={8}
        md={4}
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
              onClick={() => {
                dispatch(setCurrentUrl(`/userInfo/${data.playerId}`));
                infoData.setShowState(false);
              }}
            >
              <UserNicknameSpan>{data.nickname}</UserNicknameSpan>
            </Link>
          </div>
        </div>
      </Col>
      <Col
        xs={6}
        md={4}
        style={{
          display: "flex",
          placeItems: "center",
          alignItems: "center",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <KdaSpan>{data.playInfo.killCount}</KdaSpan>/
            <KdaSpan>{data.playInfo.deathCount}</KdaSpan>/
            <KdaSpan>{data.playInfo.assistCount}</KdaSpan>
          </div>
          <div style={{ textAlign: "center" }}>
            <VerdictSpan>{kda(data)}</VerdictSpan>
          </div>
        </div>
      </Col>
      <Col xs={10} md={6}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <div>
            <span style={{ color: "#6f6f6f" }}>
              <FontSizeSpan>공격량</FontSizeSpan>
            </span>
            <br />
            <span
              style={{
                color: "#00860a",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <FontSizeSpan>{data.playInfo.attackPoint}</FontSizeSpan>
            </span>
            <br />
            <span style={{ color: "#6f6f6f" }}>
              <FontSizeSpan>피해량</FontSizeSpan>
            </span>
            <br />
            <span
              style={{
                color: "#690000",
                fontWeight: "bold",
              }}
            >
              <FontSizeSpan>{data.playInfo.damagePoint}</FontSizeSpan>
            </span>
          </div>
          <div>
            <span style={{ color: "#6f6f6f" }}>
              <FontSizeSpan>전투 참여</FontSizeSpan>
            </span>
            <br />
            <span style={{ fontWeight: "bold" }}>
              <FontSizeSpan>{data.playInfo.battlePoint}</FontSizeSpan>
            </span>
            <br />
            <span
              style={{
                color: "#6f6f6f",
              }}
            >
              <FontSizeSpan>시야 확보</FontSizeSpan>
            </span>
            <br />
            <span style={{ fontWeight: "bold" }}>
              <FontSizeSpan>{data.playInfo.sightPoint}</FontSizeSpan>
            </span>
          </div>
        </div>
      </Col>
      <Col xs={24} md={10} style={{ display: "flex", alignItems: "center" }}>
        {width <= 767 ? (
          <Button
            style={{ margin: "8px auto" }}
            size="small"
            onClick={() => itemInfo(data.items)}
          >
            아이템 보기
          </Button>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {data.items.map((itemData: ItemData, itemIndex: number) => {
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
        )}
      </Col>
    </Row>
  );
}

export default PlayedInfoDetailRow;

const UserNicknameSpan = styled.span`
  text-overflow: ellipsis;
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  display: block;
  color: #171717;
  @media (max-width: 530px) {
    font-size: 8px;
  }
`;

const KdaSpan = styled.span`
  font-weight: bold;
  font-size: 12px;
  @media (max-width: 530px) {
    font-size: 8px;
  }
`;

const VerdictSpan = styled.span`
  @media (max-width: 530px) {
    font-size: 8px;
  }
`;

const FontSizeSpan = styled.span`
  font-size: 12px;
  @media (max-width: 530px) {
    font-size: 8px;
  }
`;
