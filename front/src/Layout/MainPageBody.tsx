import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { Form, Input, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import gear from "../static/media/gear.png";
import { searchUserByNickname } from "../modules/totalCyphers";

function MainPageBody(): JSX.Element {
  const { Search } = Input;
  const dispatch = useDispatch();
  const onSubmitSearchNickname = useCallback(
    (e: string) => {
      dispatch(searchUserByNickname(e));
    },
    [dispatch, searchUserByNickname]
  );
  return (
    <BodyContainer>
      <BodyWrapper>
        <MainWrapper>
          <MainImageWrapper>
            <GearBackground />
            <GearDiv />
          </MainImageWrapper>
          <MainName>
            <Title>Total Cyphers</Title>
            <SubTitle>사이퍼즈 전적 · 통계</SubTitle>
          </MainName>
        </MainWrapper>
        <div className="searchBar">
          <Col>
            <Row justify="center" align="middle">
              <Form>
                <Form.Item>
                  <Search
                    style={{ width: "300px", margin: "0 auto" }}
                    placeholder="닉네임"
                    enterButton
                    onSearch={onSubmitSearchNickname}
                  />
                </Form.Item>
              </Form>
            </Row>
          </Col>
        </div>
      </BodyWrapper>
    </BodyContainer>
  );
}

const BodyContainer = styled.main`
  width: 100%;
  height: calc(100vh - 150px);
`;

const BodyWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const MainWrapper = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
`;

const GearBackground = styled.div`
  background-color: #1b8adb;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  position: absolute;
  filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.5));
`;

const GearDiv = styled.div`
  background-image: url(${gear});
  background-size: contain;
  width: 150px;
  height: 150px;
  position: absolute;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.5));

  -webkit-animation-name: spin;
  -webkit-animation-duration: 9000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 40000ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 40000ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
  -o-transition: rotate(3600deg);

  @-moz-keyframes spin {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const MainName = styled.div`
  margin-left: 30px;
`;

const Title = styled.h2`
  font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 40px;
  color: #1f1f1f;
  margin-block-start: 0;
  margin-block-end: 0px;
  margin-inline-start: 0;
  margin-inline-end: 0;
`;

const SubTitle = styled.h3`
  font-family: "Do Hyeon", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 22px;
  color: #1f1f1f;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  letter-spacing: -0.4px;
  font-weight: 100;
`;

export default MainPageBody;
