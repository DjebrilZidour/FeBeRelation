const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const productRouter = require("./routes/product.route");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(productRouter);
app.listen(1337, () => {
  console.log("SERVER STARTED ... ");
});
