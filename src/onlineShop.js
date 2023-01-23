import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.HOST_MYSQL,
    port: process.env.PORT_MYSQL,
    user: process.env.USER_MYSQL,
    password: process.env.PASSWORD_MYSQL,
    database: process.env.DB_MYSQL,
  });
  
  const promisePool = pool.promise();

  async function onlineShop() {
    
  } 