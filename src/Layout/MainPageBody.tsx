import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { Form, Input, Col, Row } from "antd";
import cyphers_logo from "../static/media/cyphers_logo.png";
import gear from "../static/media/gear.png";
import gear_background from "../static/media/gear_background.png";

function MainPageBody(): JSX.Element {
  const { Search } = Input;

  return (
    <BodyContainer>
      <BodyWrapper>
        {/* <img
          src={cyphers_logo}
          alt="사이퍼즈 로고"
          style={{
            width: "250px",
            margin: "0 auto",
            display: "block",
            paddingTop: "50px",
            paddingBottom: "50px",
          }}
        /> */}
        <MainImageWrapper>
          <GearBackground />
          <GearDiv />
        </MainImageWrapper>
        <div className="searchBar">
          <Col>
            <Row justify="center" align="middle">
              <Form>
                <Form.Item>
                  <Search
                    style={{ width: "300px", margin: "0 auto" }}
                    placeholder="닉네임"
                    enterButton
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
  height: calc(100vh - 100px);
`;

const BodyWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  margin-top: 50px;
  margin-bottom: 50px;
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

export default MainPageBody;
