const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, Sequelize); //테이블 정보
db.Post = require("./post")(sequelize, Sequelize); //테이블 정보
db.Hashtag = require("./hashtag")(sequelize, Sequelize); //테이블 정보

db.User.hasMany(db.Post); // 한 쌍 1
db.Post.belongsTo(db.User); // 한 쌍 1

db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // 한 쌍 2
db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" }); // 한 쌍 2

db.User.belongsToMany(db.User, {
  //한 쌍 3
  foreignKey: "followingId",
  as: "Followers",
  through: "follow"
});
db.User.belongsToMany(db.User, {
  //한 쌍 3
  foreignKey: "followerId",
  as: "Followings",
  through: "follow"
});

db.User.belongsToMany(db.Post, { through: "like" });
db.Post.belongsToMany(db.User, { through: "like" });

module.exports = db;

/*
다대다 관계이해하기
1 ---> N
N <--> M 는 belongsToMany, through에는 새로 생기는 모델 이름을 넣어준다
(매칭 테이블)

[Post]
1 안녕하세요. #노드 #익스프레스
2 안녕. #노드 #제이슨
3 안뇽하셔유. #제이슨 #퍼그

[through] - 관계 테이블
1 1-1, 1-2
2 2-1, 2-3
3 3-3, 3-4

[HashTags]
1 노드
2 익스프레스
3 제이슨
4 퍼그



as: 매칭 모델 이름 ( Followings => followingId)
foreignKey 상대 테이블 아이디 ( 상대방의 프라이머리키 )
A.belongsToMany(B, {as : 'Bname', foreignKey:'A_id})



*/
