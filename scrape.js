var webdriver = require('selenium-webdriver'); // including webdriver
var By = webdriver.By; //obj have properties -> id xpath className name
var map = webdriver.promise.map;
/* if you are using the chrome driver via npm install chromedriver@2.43
 uncomment below line, otherwise dont have to include it
 /*var chrome = require('chromedriver'); // requiring chrome driver installed via npm command
 */

var driver = new webdriver.Builder() //driver provide interaction with hardware
  .forBrowser('chrome') //mentioning the browser
  .build(); // Opening our browser

driver.get(
  'https://www.moneycontrol.com/mutual-funds/performance-tracker/returns/aggressive-hybrid-fund.html'
); //getting the URL

/**
 * Adding seleinum wait
 * Delay in seconds
 * @param int time
 * @param function func
 **/
function Pause(Time, FuncName) {
  setTimeout(FuncName, Time * 1000);
}

/*
 * Calls the method after 2 seconds of delay.
 */
Pause(10, iterateOverMF);
/*
 * Scrapping the page for the demonstration of various selenium elements and methods
 */

const extractMFData = async (fetchedDriver) => {
  const MFName = await fetchedDriver
    .findElement(By.className('page_heading'))
    .getText();

  const MFCategory = await fetchedDriver
    .findElement(By.className('sub_category_text'))
    .getText();

  const MFFundSize = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[1]/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[1]/td[1]/span[3]'
      )
    )
    .getText();

  const MFExpenseRatio = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[1]/div/div[1]/div[2]/div[3]/div[1]/table/tbody/tr[1]/td[2]/span[3]'
      )
    )
    .getText();

  const MFRisk = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[1]/div/div[1]/div[2]/div[3]/div[2]/div/div[2]/span'
      )
    )
    .getText();

  const _1YrReturn = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[6]/div/div[1]/div[1]/table/tbody/tr[6]/td[5]'
      )
    )
    .getText();

  const _3YrReturn = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[6]/div/div[1]/div[1]/table/tbody/tr[8]/td[5]'
      )
    )
    .getText();

  const _5YrReturn = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[6]/div/div[1]/div[1]/table/tbody/tr[9]/td[5]'
      )
    )
    .getText();

  const stdDeviationRatio = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[1]/div/div[2]/span[1]'
      )
    )
    .getText();

  const betaRatio = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[2]/div/div[2]/span[1]'
      )
    )
    .getText();

  const sharpRatio = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[3]/div/div[2]/span[1]'
      )
    )
    .getText();

  const sortinoRatio = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[4]/div/div[2]/span[1]'
      )
    )
    .getText();

  const alphaRatio = await fetchedDriver
    .findElement(
      By.xpath(
        '//*[@id="mc_content"]/div/section[9]/div/ul/li[5]/div/div[2]/span[1]'
      )
    )
    .getText();

  console.log(
    'NAME: ' +
      MFName +
      '\tCATEGORY: ' +
      MFCategory +
      '\tFUNDSIZE: ' +
      MFFundSize +
      '\tEXPENSERATIO: ' +
      MFExpenseRatio +
      '\tRISK: ' +
      MFRisk +
      '\t1Yr: ' +
      _1YrReturn +
      '\t3Yr: ' +
      _3YrReturn +
      '\t5Yr: ' +
      _5YrReturn +
      '\tALPHA: ' +
      alphaRatio +
      '\tBETA: ' +
      betaRatio +
      '\tSTD DEVIATION: ' +
      stdDeviationRatio +
      '\tSORTINO: ' +
      sortinoRatio +
      '\tSHARP: ' +
      sharpRatio
  );
};

const extractCrisilAndOpenMF = async (parentelem) => {
  const crisilRating = await parentelem
    .findElement(By.css('.crisil_col'))
    .getText();
  // console.log('Crisil Ratings: ' + crisilRating);

  // const MFlink = await parentelem
  //   .findElement(By.tagName('a'))
  //   .getAttribute('href')
  //   .click();

  const MFlink = await parentelem.findElement(By.tagName('a')).click();

  console.log('Type: ' + typeof MFlink);
  console.log('Object: ' + JSON.stringify(MFlink));

  // console.log('MF Link: ' + link);

  // extractMFData(MFlink);
  return MFlink;
};

function iterateOverMF() {
  const elems = driver.findElements(By.css('#dataTableId > tbody > tr'));
  // .then((data) => console.log('Data: ' + JSON.stringify(data)));

  // UnComment This Block
  // map(elems, (e) => e.findElement(By.tagName('a')).getAttribute('href')).then(
  //   function (values) {
  //     console.log(values);
  //   }
  // );

  map(elems, (e) => extractCrisilAndOpenMF(e))
    .then(function (data) {
      extractMFData(data);
    })
    .catch((err) => {
      console.log(err);
    });

  Pause(10, QuitDriver);
}

// function ScrapeExample() {
//   //statement
//   console.log('Start Scraping the page...');
//   driver.findElement(By.id('name')).sendKeys('Jazeb Akram Instructor');
//   driver.findElement(By.xpath('//input[@value="female"]')).click();
//   driver.findElement(By.name('vehicle1')).click();

//   /*
//    * Get the text from multiple elements
//    */
//   driver.findElements(By.id('fruits')).then(function (elements) {
//     for (var i = 0; i < elements.length; i++) {
//       elements[i].getText().then(function (text) {
//         console.log('List of Fruits \n' + text);
//       });
//     }
//   });

//   driver
//     .findElement(By.xpath('//select[@id="cars"]/option[@value="BMW"]'))
//     .click();
//   /**
//    * Getting the href based on search query parameter using partial link
//    */
//   driver
//     .findElement(By.partialLinkText('Jazeb'))
//     .getAttribute('href')
//     .then(function (value) {
//       console.log('1st link' + value);
//     });
//   /**
//    * Getting the href based on anchor tag value  using  linkText
//    */
//   driver
//     .findElement(By.linkText('Jazeb Akram'))
//     .getAttribute('href')
//     .then(function (value) {
//       console.log('2nd link' + value);
//     });

//   Pause(7, QuitDriver);
// }

/**
 * Closing and then quiting the driver after scrapping has been done
 */
function QuitDriver() {
  driver.close();
  driver.quit();
}
