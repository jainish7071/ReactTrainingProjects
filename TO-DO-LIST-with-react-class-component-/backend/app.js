const { json } = require("express");
const e = require("express");
const express = require("express");
const connectToMongo = require("./db");
const Todo = require("./Models/Todo");
const cors = require('cors');

connectToMongo();
const app = express();
const port = 5000;
app.use(json());
app.use(cors());

app.use("/api/todo", require("./routes/todo"));
app.use("/api/auth",require("./routes/auth"));

app.listen(port, () => {
  console.log(`Server is live http://localhost:${port}`);
});
