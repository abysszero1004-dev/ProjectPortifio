const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 3000

// Cấu hình kết nối PostgreSQL
const pool = new Pool({
  user: 'postgres', // thay bằng user của bạn
  host: 'localhost',
  database: 'shoponline', // thay bằng tên database của bạn
  password: 'yourpassword', // thay bằng mật khẩu của bạn
  port: 5432,
})

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Database error')
  }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
