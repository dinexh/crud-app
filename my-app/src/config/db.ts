import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',      
  password: 'Dinesh@123',      
  database: 'todo_app'
});

export default db;
