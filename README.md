# Express로 만들어 보는 웹 서비스 2019
### db설정
1) npm i -g sequelize-cli
2) sequelize init
3) db > table > row
4) config 파일 설정
5) sequelize db:create 

### .env
1) npm i dotenv
2) dotenv.config() 를 하는 순가 process.env 에 설정 값이 들어 간다.

### models를 참고한 데이터 테이블 생성
1) v5 마이 sql 사용

### passport bcrypt 설치시 문제 발생 
1)https://github.com/nodejs/node-gyp#on-windows

### nvm 
1) 깃에서 윈도우 용으로 다운 받아서 사용할 수 있습니다.
2) nvm list / nvm install version / nvm user version 으로 사용할 수 있습니다.

### passport 인증 절차
1) 로그인 라우터 /login 로 local 인증 데이터로 접근
2) local 전략 실행후 done 콜백 실행 후 req.login(user, err) 실행. 세션에 저장
3) req.login 실행 할 경우 passport.serializeUser((user, done) => {<br/>
  // user : {id:1, name:hong, ....}
}) 실행<br/>
4) passport.session() 여기서 deserializeUser가 실행. user.id 를 통해 DB 조회후 req.user로 저장

### multer로 이미지 업로드
1) 이미지 업로드를 위해서는 데이터 처리를 위한 multer가 필요한다.
2) form tag : enctype="multipart/form-data" 를 할 경우에는 "bodyParser" 에서 해석을 못 한다.
3) 그렇기 때문에 multer를 이용한다.


### API 서버의 개념과 필요성
1) Application Programming Interface : 남이 만든 코드를 사용할 수 있게 해주는 창구

### jwt - jsonwebtoken
<pre>
<code>
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  {
    id: "Geonil",
    age: 28,
    gender: "male"
  },
  "helloworld",
  {
    expiresIn: "1m",
    issuer: "express-web-service"
  }
);

console.log(token);

console.log(jwt.verify(token, "helloworld"));

</code>
</pre>