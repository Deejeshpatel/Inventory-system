const fs = require("fs");
const { Parser } = require("json2csv");
const csvParser = require("csv-parser");

exports.generateCSV = (data) => {
  const json2csvParser = new Parser();
  return json2csvParser.parse(data);
};

exports.parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};
