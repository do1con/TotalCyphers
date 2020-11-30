const express = require("express");
const app = express();
const rp = require("request-promise");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "front/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front/build/index.html"));
  console.log("더네임", __dirname);
});

app.post("/proxy/totalcyphers/", async (req, res) => {
  console.log("리퀘스트 컨텍스트", req.body);
  const requestContext = req.body.data;
  const requestMethod = requestContext.reqMethod;

  switch (requestMethod) {
    case "getUserByNickname": {
      console.log("유저에게 받기");
      rp(
        `https://api.neople.co.kr/cy/players?nickname=${encodeURI(
          requestContext.payload.nickname
        )}&wordType=full&limit=5&apikey=${API_KEY}`
      )
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log("정상적인 요청을 처리하던 중 에러가 발생했습니다.", err);
          res
            .status(500)
            .send("정상적인 요청을 처리하던 중 에러가 발생했습니다.");
        });
      break;
    }
    case "getUserInfoById": {
      console.log("id로 유저 정보 조회");
      rp(
        `https://api.neople.co.kr/cy/players/${encodeURI(
          requestContext.payload.userId
        )}?apikey=${API_KEY}`
      )
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log("정상적인 요청을 처리하던 중 에러가 발생했습니다.", err);
          res
            .status(500)
            .send("정상적인 요청을 처리하던 중 에러가 발생했습니다.");
        });
      break;
    }
    case "getUserPlayList": {
      console.log("유저 전적 검색");
      rp(
        `https://api.neople.co.kr/cy/players/${encodeURI(
          requestContext.payload.userId
        )}/matches?gameTypeId=${requestContext.payload.playType}&startDate=${
          requestContext.payload.searchStartRange
        }&endDate=${requestContext.payload.searchEndRange}
        &limit=100&apikey=${API_KEY}`
      )
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log("정상적인 요청을 처리하던 중 에러가 발생했습니다.", err);
          res
            .status(500)
            .send("정상적인 요청을 처리하던 중 에러가 발생했습니다.");
        });
      break;
    }
    case "getGameDetail": {
      console.log("게임 전적 디테일");
      rp(
        `https://api.neople.co.kr/cy/matches/${requestContext.payload.matchId}?apikey=${API_KEY}`
      )
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log("정상적인 요청을 처리하던 중 에러가 발생했습니다.", err);
          res
            .status(500)
            .send("정상적인 요청을 처리하던 중 에러가 발생했습니다.");
        });
      break;
    }
    default: {
      console.log("잘못된 요청이 들어왔습니다.");
      console.log("요청 : ", requestMethod);
      res.status(400).send("잘못된 요청입니다.");
      break;
    }
  }

  console.log("reqested", requestContext);
  console.log(
    `https://api.neople.co.kr/cy/matches/${requestContext.payload.matchId}?apikey=${API_KEY}`
  );
});

app.post("/proxy/totalcyphers/test/", (req, res) => {
  console.log("requested test");
  res.send("test");
});

const SERVER_PORT = 5000;
const HOST = "0.0.0.0";
// @ts-ignore
app.listen(process.env.PORT || 5000, HOST, () => {
  console.log(`APP is listening on port ${SERVER_PORT}`);
  console.log(process.env.PORT);
});
