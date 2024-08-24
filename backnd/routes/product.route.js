const { Router } = require("express");
const {
  createCommand,
  readCommands,
} = require("../controller/product.controller.js");

const productRouter = Router();

productRouter.post("/product", createCommand);
productRouter.get("/product", readCommands);

module.exports = productRouter;
