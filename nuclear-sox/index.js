const express = require("express");
const cors = require("cors");
const path = require("path");
const { json } = require("body-parser");
const pg = require("./pg");

const app = express();
app.use(cors());
app.use(json());

app.use(express.static(path.join(__dirname, "./client/build")));

pg.initDb();

app.get("/allItems", async (req, res) => {
  res.send(await pg.getList());
});

app.delete("/del/:id", async (req, res) => {
  pg.del(Number(req.params.id));
});

app.post("/add", (req, res) => {
  pg.insertData(req.body);
  console.log(`inserted to db: ${req.body.model}`);
});

app.get("/getById/:id", async (req, res) => {
  res.send(await pg.getItem(Number(req.params.id)));
});

app.post(`/update/:id`, (req, res) => {
  pg.updateItem(req.body, req.params.id);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Hosted: http://localhost:" + port);
});
