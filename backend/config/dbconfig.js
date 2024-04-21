const Sequelize = require("sequelize");
const sequelize = new Sequelize("BOOK_STORE_DB", "admin", "abcd1234", {
  host: "jman-mini-project-book-store.cje1ut4sij6i.ap-south-1.rds.amazonaws.com",
  port: "3306",
  dialect: "mysql",
});

module.exports = sequelize;
