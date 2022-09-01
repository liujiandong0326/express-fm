const express = require("express");
const fs = require("fs");
const { promisify } = require("util");
const app = new express();
const readFile = promisify(fs.readFile);

app.use(express.urlencoded()); // 处理客户端发送的 content-type: application/x-www-form-urlencode 的数据
app.use(express.json()); // 处理客户端发送的 content-type: application/json 的数据
app.get("/", async (req, res) => {
  try {
    const data = await readFile("./db.json");
    const json = JSON.parse(data);
    res.send(json.users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/", (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("Run http://localhost:3000");
});
