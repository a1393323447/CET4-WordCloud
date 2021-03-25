const puppeteer = require('puppeteer');
const fs = require("fs");
var d = require("./data.js");

(async () => {
    let data = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    for (let i = 0; i < d.urls.length; i++){
      try {
        await page.goto(d.urls[i]);
        await page.waitForSelector("#article_eng > p > span");
      }
      catch (e) {
          continue;
      }
      let words = await page.$$eval(
        "#article_eng > p > span",
        (links) => links.map((x) => x.innerHTML)
      );
      words.pop();
      data = data.concat(words);
      fs.writeFile("words.json", JSON.stringify(data, null, "\t"), function (err){
          if (err)
          {
            console.log(err);
          }
      });

      console.log(i)
    }
    // await browser.close();
  })();