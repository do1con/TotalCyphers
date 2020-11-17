import React, { useEffect, useCallback } from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
import neople_openapi_bi from "../static/media/neople_openapi_bi.png";

function Footer(): JSX.Element {
  return (
    <FooterContainer>
      <span>내용</span>
      <a href="http://developers.neople.co.kr" target="_blank" rel="noreferrer">
        <img src={neople_openapi_bi} alt="네오플 오픈 API BI" />
      </a>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 50px;
`;

export default Footer;
