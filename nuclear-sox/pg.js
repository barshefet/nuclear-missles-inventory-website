//TODO: sanatize

const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function connectToDB() {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  } finally {
    console.log("connected to DB");
  }
}

async function initDb() {
  connectToDB();

  await client.query(
    `CREATE TABLE IF NOT EXISTS socks(
          socks_id SERIAL PRIMARY KEY,
          model TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          size INTEGER NOT NULL,
          location TEXT NOT NULL,
          year INTEGER NOT NULL,
          history TEXT NOT NULL,
          officer TEXT NOT NULL
      );`
  );
}

async function insertData(data) {
  await client.query(
    `INSERT INTO socks(socks_id, model, quantity, size, location, year, history, officer) 
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`,
    [
      data.model,
      data.quantity,
      data.size,
      data.location,
      data.year,
      data.history,
      data.officer,
    ]
  );
}

async function getList() {
  const items = await client.query("SELECT * FROM socks");
  return items.rows;
}

async function getItem(id) {
  const item = await client.query(
    `SELECT * FROM socks
  WHERE socks_id = $1;`,
    [id]
  );
  return item.rows;
}

async function updateItem(input, id) {
  await client.query(
    `UPDATE socks
  SET model = $1, quantity = $2, size = $3, location = $4, year = $5, history = $6, officer = $7
  WHERE socks_id = $8`,
    [
      input.model,
      input.quantity,
      input.size,
      input.location,
      input.year,
      input.history,
      input.officer,
      id,
    ]
  );
}

async function del(id) {
  try {
    await client.query(`DELETE FROM socks WHERE socks_id = $1`, [id]);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  initDb,
  getList,
  insertData,
  del,
  getItem,
  updateItem,
};
