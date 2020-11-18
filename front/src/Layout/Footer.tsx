import React, { useEffect, useCallback } from "react";
import { DatePicker } from "antd";
import styled from "styled-components";
import neople_openapi_bi from "../static/media/neople_openapi_bi.png";

function Footer(): JSX.Element {
  return (
    <FooterContainer>
      <CopyWrites>
        <h3 style={{ textAlign: "right", fontSize: "12px" }}>
          본 페이지는 김성수가 만들었습니다.
        </h3>
      </CopyWrites>
      <PoweredBy>
        <a
          href="http://developers.neople.co.kr"
          target="_blank"
          rel="noreferrer"
        >
          <img src={neople_openapi_bi} alt="네오플 오픈 API BI" />
        </a>
      </PoweredBy>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 50px;
  display: flex;
`;

const CopyWrites = styled.div`
  width: 50%;
  height: 50px;
  padding-right: 50px;
  box-sizing: border-box;
`;

const PoweredBy = styled.div`
  width: 50%;
  height: 50px;
`;

export default Footer;
