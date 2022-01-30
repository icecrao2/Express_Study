const express = require('express');
const app = express();
const port = 3000;
const {ex0, ex1, ex2} = require('./nextex');

// app.listen 을 통하여 서버를 실행한다.
app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`);
})


// 요청 메소드중 get방식으로 해당 주소 포트로 요청을 보내면 실행되는 라우트
app.get('/', (req, res) => {
  res.send('Get방식');  //클라이언트를 향해 해당 문자열을 보내줌
});

// 요청 메소드중 post방식으로 해당 주소 포트로 요청을 보내면 실행되는 라우트
app.post('/', (req, res) => {
  res.send('post방식');  //클라이언트를 향해 해당 문자열을 보내줌
});

// 라우트 핸들러에서 2개 이상에 콜백함수를 순서대로 실행시키는 방법.
app.get('/callback',(req,res,next)=>{

  console.log("abc");
  //res.send("abc");  이렇게 하면 next에 있는 res가 작동을안함
  next();

}, (req, res)=>{
  res.send("cde");
  console.log("efg");
})

// 이런식으로 라우트 핸들러가 가능하다.
app.get('/callback2', [ex0, ex1, ex2]);
