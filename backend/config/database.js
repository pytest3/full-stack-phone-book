// this is the file that Sequelize will use to access our postgres db
require("dotenv").config();

// The values below are used by sequelize and pg to interface with the db
module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
  },
};
