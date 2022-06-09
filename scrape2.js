const MutualFund = require('./MutualFund');

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

Pause(10, iterateMF);

const scrapeMF = async (parentelem) => {
  // ~~~~~~~~~~ CRISIL RATING ~~~~~~~~~~
  let MFCrisilRatingStr = await parentelem
    .findElement(By.css('.crisil_col'))
    .getText();

  if (MFCrisilRatingStr === '-') {
    MFCrisilRatingStr = 0;
  }

  MFCrisilRating = parseInt(MFCrisilRatingStr);

  var parent = await driver.getWindowHandle();

  // ~~~~~~~~~~ CLICK ON MUTUAL FUND LINK ~~~~~~~~~~
  await parentelem.findElement(By.tagName('a')).click();

  var windows = await driver.getAllWindowHandles();

  await driver.switchTo().window(windows[1]);

  const MFName = await driver
    .findElement(By.className('page_heading'))
    .getText();

  const MFCategory = await driver
    .findElement(By.className('sub_category_text'))
    .getText();

  const MFLaunch = 'NULL';

  const MFFundSize = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[1]/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[1]/td[1]/span[3]'
      )
    )
    .getText();

  const MFExpenseRatio = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[1]/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[1]/td[2]/span[3]'
      )
    )
    .getText();

  const MFRisk = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[1]/div/div[1]/div[2]/div[3]/div[2]/div/div[2]/span'
      )
    )
    .getText();

  const _1YrReturn = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[6]/div/div[1]/div[1]/table/tbody/tr[6]/td[5]'
      )
    )
    .getText();

  const _3YrReturn = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[6]/div/div[1]/div[1]/table/tbody/tr[8]/td[5]'
      )
    )
    .getText();

  const _5YrReturn = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[6]/div/div[1]/div[1]/table/tbody/tr[9]/td[5]'
      )
    )
    .getText();

  const stdDeviationRatio = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[1]/div/div[2]/span[1]'
      )
    )
    .getText();

  const betaRatio = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[2]/div/div[2]/span[1]'
      )
    )
    .getText();

  const sharpRatio = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[3]/div/div[2]/span[1]'
      )
    )
    .getText();

  const sortinoRatio = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[4]/div/div[2]/span[1]'
      )
    )
    .getText();

  const alphaRatio = await driver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[5]/div/div[2]/span[1]'
      )
    )
    .getText();

  await driver.close();
  await driver.switchTo().window(parent);

  MFObj = new MutualFund(
    MFName,
    MFCategory,
    MFLaunch,
    MFCrisilRating,
    MFFundSize,
    _1YrReturn,
    _3YrReturn,
    _5YrReturn,
    MFRisk,
    MFExpenseRatio,
    sharpRatio,
    sortinoRatio,
    alphaRatio,
    betaRatio,
    stdDeviationRatio
  );
};

async function iterateMF() {
  const elems = await driver.findElements(By.css('#dataTableId > tbody > tr'));

  // console.log(typeof elems);
  // console.log(elems);

  map(elems, async (e) => {
    let text = 'NULL';
    try {
      text = await e.findElement(By.tagName('span')).getText();
    } catch (err) {
      text = 'NULL';
    }
    if (text !== 'Sponsored Adv') scrapeMF(e);
  });

  // map(elems, (e) => scrapeMF(e))
  //   .then(function (data) {
  //     console.log(data + '\nNEWLINE\n');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // elems
  //   .filter(function (e) {
  //     if (e.findElement(By.className('SpAd')).getText() === 'Sponsored Adv') {
  //       return false;
  //     }
  //     return true;
  //   })
  //   .map(elems, (e) => scrapeMF(e))
  //   .then(function (data) {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // elems.reduce(function (result, e) {
  //   if (e.findElement(By.className('SpAd')).getText() !== 'Sponsored Adv') {
  //     result.push(scrapeMF(e));
  //   }
  //   return result;
  // }, []);

  // Pause(50, QuitDriver);
}

function QuitDriver() {
  driver.close();
  driver.quit();
}
