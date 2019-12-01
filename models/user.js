// const Sequelize = require('sequelize'); ==> DataTypes
// const sequelize = new Sequelize(
//   config.database, config.username, config.password, config,
// );

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: "local"
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );

/*
  provider : local vs kakao
  timestamps: 생성일, 수정일 자동 기록
  paranoid: 삭제일(복구용)
*/
