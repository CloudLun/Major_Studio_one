const fs = require("fs");
const cheerio = require("cheerio");

let rawData = [];
let data = [];

var content = fs.readFileSync("./data/lexicon.txt");
var $ = cheerio.load(content);

$("div").each(function (i, elem) {
  if ($(elem).attr("class") == "terms-left") {
    // // console.log($(elem).html());
    // console.log('*************')
    data.push(
      $(elem).html().replace("\n    <p>", "").replace("</p>\n\n    \n  ", "")
    );
  }
});

for (let i = 400; i<data.length; i++){
  console.log(data[i])
}
