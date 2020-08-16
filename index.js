const cheerio = require('cheerio');
const request = require('request-promise');
const json2csv = require('json2csv').Parser;
const fs = require("fs");

const book = "https://www.dawateislami.net/bookslibrary/ur/madani-muzakrah-kay-137-suwalat-jawabat";

(async () => {
    
    let data = [];
    const response = await request({

        uri: book,
        headers: {
            
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"accept-encoding": "gzip, deflate, br",
"accept-language": "en-US,en;q=0.9"
        },
        gzip: true,

    });

    let $ = cheerio.load(response);
    let title = $('body > main > div > section:nth-child(7) > div > div > div.content-Container.center-panel.col-md-9.col-sm-9.col-xs-12 > div:nth-child(2) > div.col-md-12.col-sm-12.col-xs-12.text-center.detail-heading > h3').text().trim();
    let author = $('body > main > div > section:nth-child(7) > div > div > div.content-Container.center-panel.col-md-9.col-sm-9.col-xs-12 > div:nth-child(2) > div.col-md-9.col-xs-9.col-sm-10.res-padding.res-margin-left > table > tbody > tr:nth-child(2) > td:nth-child(2) > span').text().trim();
    let languge = $('body > main > div > section:nth-child(7) > div > div > div.content-Container.center-panel.col-md-9.col-sm-9.col-xs-12 > div:nth-child(2) > div.col-md-9.col-xs-9.col-sm-10.res-padding.res-margin-left > table > tbody > tr:nth-child(1) > td:nth-child(2) > span > a').text().trim();
    let totalpages = $('body > main > div > section:nth-child(7) > div > div > div.content-Container.center-panel.col-md-9.col-sm-9.col-xs-12 > div:nth-child(2) > div.col-md-9.col-xs-9.col-sm-10.res-padding.res-margin-left > table > tbody > tr:nth-child(4) > td:nth-child(2) > span').text().trim();

    data.push({
        title,
        author,
        languge,
        totalpages

    });

    const j2cp = new json2csv();
    const csv = j2cp.parse(data);

    fs.writeFileSync("./BooksDetails.csv", csv, "utf-8");


})()