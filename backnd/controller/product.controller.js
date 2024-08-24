const fs = require("fs");

const path = "data.json";

function getCurrentFormattedDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const createCommand = (req, res) => {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`${path} does not exist`);
      fs.writeFileSync(
        "data.json",
        JSON.stringify([
          {
            name: req.body.name,
            phone: req.body.phone,
            wilaya: req.body.wilaya,
            orderTime: getCurrentFormattedDateTime(),
          },
        ]),
        "utf8"
      );
      res.status(200).json({ message: "first command saved" });
    } else {
      console.log(`${path} exists`);
      const data = fs.readFileSync("data.json", "utf8"); // <= JSON
      const parsedData = JSON.parse(data); // list
      parsedData.push({
        name: req.body.name,
        phone: req.body.phone,
        wilaya: req.body.wilaya,
        orderTime: getCurrentFormattedDateTime(),
      });
      // after add the last command
      fs.writeFileSync("data.json", JSON.stringify(parsedData), "utf8");
      res.status(200).json({ message: "command saved" });
    }
  });
};
const readCommands = (req, res) => {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`${path} does not exist`);
      res.status(404).json({ data: [] });
    } else {
      console.log(`${path} exists`);
      const data = fs.readFileSync("data.json", "utf8"); // <= JSON
      const parsedData = JSON.parse(data); // list
      res.status(200).json({ data: parsedData });
    }
  });
};

module.exports = { createCommand, readCommands };
