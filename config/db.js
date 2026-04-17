const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
   ssl: {
        rejectUnauthorized: false
    }
});
db.getConnection((err, conn) => {
  if (err) {
    console.log("DB ERROR ❌", err.message);
  } else {
    console.log("DB CONNECTED ✅");
    conn.release();
  }
});

module.exports = db;