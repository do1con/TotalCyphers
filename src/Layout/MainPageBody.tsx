import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { Form, Input, Button, Col, Row } from "antd";
import cyphers_logo from "../static/media/cyphers_logo.png";

function MainPageBody(): JSX.Element {
  const [form] = Form.useForm();

  return (
    <BodyContainer>
      <BodyWrapper>
        <img
          src={cyphers_logo}
          alt="사이퍼즈 로고"
          style={{
            width: "250px",
            margin: "0 auto",
            display: "block",
            paddingTop: "70px",
            paddingBottom: "70px",
          }}
        />
        <div className="searchBar">
          <Col>
            <Row justify="center" align="middle">
              <Form>
                <Form.Item>
                  <Input
                    style={{ width: "300px", margin: "0 auto" }}
                    placeholder="닉네임"
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
  background-color: #434343;
  height: 100vh;
`;

const BodyWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
`;

export default MainPageBody;
