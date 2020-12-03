import React from "react";
import styled from "styled-components";
import neople_openapi_bi from "../static/media/neople_openapi_bi.png";

function Footer(): JSX.Element {
  return (
    <FooterContainer>
      <CopyWrites>
        <h3 style={{ textAlign: "right", fontSize: "12px" }}>
          본 페이지는 김성수가 만들었습니다.
          <br />
          문의 : kss7547@gmail.com
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
  flex-wrap: wrap;
  justify-content: center;
`;

const CopyWrites = styled.div`
  height: 50px;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
`;

const PoweredBy = styled.div`
  height: 50px;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
`;

export default Footer;
