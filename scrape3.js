var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var map = webdriver.promise.map;

var driver = new webdriver.Builder().forBrowser('chrome').build();

driver.get(
  'https://www.moneycontrol.com/mutual-funds/performance-tracker/returns/aggressive-hybrid-fund.html'
);

/**
 * Adding seleinum wait
 * Delay in seconds
 * @param int time
 * @param function func
 **/
function Pause(Time, FuncName) {
  setTimeout(FuncName, Time * 1000);
}

Pause(10, scrapeMF);

const MFLinks = [];

async function scrapeMF() {
  let elems = await driver.findElements(By.css('#dataTableId > tbody > tr'));

  elems.filter(async (e) => {
    let text = 'NULL';
    try {
      text = await e.findElement(By.tagName('span')).getText();
    } catch (err) {
      text = 'NULL';
    }
    if (text !== 'Sponsored Adv') {
      const MF = {
        name: await e.findElement(By.tagName('a')).getText(),
        link: await e.findElement(By.tagName('a')),
      };
      MFLinks.push(MF);
    }
  });

  Pause(30, QuitDriver);
}

Pause(20, function () {});

function QuitDriver() {
  driver.close();
  driver.quit();
}
