const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

const connectDB = () => {
    return new Promise((resolve, reject) => {
        con.connect(err => {
            if(err){ 
                return reject(err);
            }else{
                const sql = 'CREATE TABLE IF NOT EXISTS tasks (task_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, item VARCHAR(255) NOT NULL);';
                con.query(sql, err => {
                    if(err) return reject(err);
                    else return resolve('Connected to the database...'); 
                });
            }
        });
    });
};

module.exports = {
    con,
    connectDB
};