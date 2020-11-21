const express = require("express");
const app = express();
const rp = require("request-promise");
const cors = require("cors");
require("dotenv").config();
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

app.post("/proxy/totalcyphers/", async (req, res) => {
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
          res.status(500).send(err);
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
          res.status(500).send(err);
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
    `https://api.neople.co.kr/cy/players/${encodeURI(
      requestContext.payload.userId
    )}&apikey=${API_KEY}`
  );
});

app.post("/proxy/totalcyphers/test/", (req, res) => {
  console.log("requested test");
  res.send("test");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`APP is listening on port ${PORT}`);
});
