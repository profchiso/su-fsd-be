const express = require("express");
const csvParser = require("csv-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());

app.get("/api/data", (req, res) => {
  const results = [];

  fs.createReadStream("data.csv")
    .pipe(csvParser())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      let final = [];
      const valuesArray = results.map((item) => Object.values(item)[0]);
      for (let i of valuesArray) {
        let parts = i.split(";");
        final.push({
          date: parts[0],
          fileName: parts[1],
        });
      }
      res.json(final);
    });
});

app.listen(5001, () => {
  console.log("Backend server is running on port 5001");
});
