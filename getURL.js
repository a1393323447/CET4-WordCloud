const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
  let data = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (let pg = 1; pg < 16; pg++){
    await page.goto('http://www.kekenet.com/cet4/r/ydzt/List_'+ pg + '.shtml');
    await page.waitForSelector("#menu-list > li > h2 > a");
    let URLs = await page.$$eval(
      "#menu-list > li > h2 > a",
      (links) => links.map((x) => x.href)
    );
    
    console.log(URLs);
    data = data.concat(URLs);
    fs.writeFile("data.json", JSON.stringify(data, null, "\t"), function (err){
        if (err)
        {
          console.log(err);
        }
    });
  }
  // await browser.close();
})();