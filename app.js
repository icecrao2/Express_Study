const express = require('express'); 

const app = express();
const port = 3000;
const {ex0, ex1, ex2} = require('./nextex');
const productRouter = require('./product/product');

// app.listen 을 통하여 서버를 실행한다.
app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`);
})


//body request json값을 받아오기 위함
//본 express는 4.17 버전임으로 express.json을 사용하여 해결 가능
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
//정적 파일을 제공하기 위해 정적파일이있는 폴더를 불러옴
//app.use(express.static('public'));
//정적 파일을 미들웨어함수를 통해 제공되는 파일에대한 경로에 가상 경로를 앞에 추가하고 싶다면
app.use('/static', express.static('public'));

app.use('/product', productRouter);
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile);
app.set('views', './')

app.get('/error', function(req,res,next){
  if(true)
    next(new Error('두번째 에러'));
  else
    res.send('good no errors');
});


// 요청 메소드중 get방식으로 해당 주소 포트로 요청을 보내면 실행되는 라우트
app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Get방식');  //클라이언트를 향해 해당 문자열을 보내줌
});

// 요청 메소드중 post방식으로 해당 주소 포트로 요청을 보내면 실행되는 라우트
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('post방식');  //클라이언트를 향해 해당 문자열을 보내줌
});

// 라우트 핸들러가 2개 이상일때 콜백함수를 순서대로 실행시키는 방법.
app.get('/callback',(req,res,next)=>{

  console.log("abc");
  //res.send("abc");  이렇게 하면 next에 있는 res가 작동을안함
  next();

}, (req, res)=>{
  res.send("cde");
  console.log("efg");
})
// 위 방식을 이렇게 간결하게 할 수 있다.
app.get('/callback2', [ex0, ex1, ex2]);


//404에러는 이런식으로 사용한다.
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
//res.render('404error', {error: '404'});
});

//catch-all 에러핸들러 임으로 에러 핸들러중에서도 가장 아래 배치한다.
//500 에러 중에서도 사용자에 맞게 변화시켜서 에러 처리를 해주면 될 것 같다.
app.use(function(err,req,res,next){
 
  if(err.message == '첫번재 에러!')
    res.status(500).json({statusCode: res.statusCode, errMessage:err.message});
  else
    next(err);
});

app.use(function(err,req,res,next){
  res.status(500);    //res.status(코드) 현재 에러 코드를 500으로 하겠다.
  res.send('아 ㅋㅋ 모르겠다고')
});
