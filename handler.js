const mysql= require("mysql");
const AWS = require('aws-sdk');
const cheerio = require('cheerio');

module.exports.scrapedmvwait = (event, context, callback) => {
  let newJobs, allJobs;

  request('https://fortress.wa.gov/dol/dolprod/dsdoffices/OfficeInfo.aspx?cid=583&oid=24')
    .then(({data}) => {
      const waitData = extractWaitDataFromHTML(data);
      callback(null, {jobs});
    })
    .catch(callback);
};

function extractWaitDataFromHTML (html) {
  const $ = cheerio.load(html);

  // Extract information from div
  let waitData = {};
  waitData.now = Date.now();
  waitData.timeOnSite = $('#ctl00_Main_waittime strong').textContent;
  let divParts = $('#ctl00_Main_waittime').innerHTML.split('<br>');
  waitData.waitMins = divParts[2];

  return waitData;
}

