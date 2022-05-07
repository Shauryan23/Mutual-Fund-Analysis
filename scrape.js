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

// First XPath - //*[@id="dataTableId"]/tbody/tr[2]/td[1]/a
// Last XPath - //*[@id="dataTableId"]/tbody/tr[38]/td[1]/a
// Ad1 - //*[@id="dataTableId"]/tbody/tr[1]/td[1]/a
// Ad2 - //*[@id="dataTableId"]/tbody/tr[12]/td[1]/a

const findChildElements = (parentelem) => {
  const childNum = parentelem.childElementCount;
  // console.log('Inside Function: ' + childNum + '\n');
  return childNum;
};

async function iterateOverMF() {
  console.log('*-----------------Starting to Scrape MF-----------------*');

  const elems = driver.findElements(By.css('#dataTableId > tbody > tr'));

  await map(elems, (e) =>
    e.findElement(By.tagName('a')).getAttribute('href')
  ).then(function (values) {
    console.log(values);
  });

  Pause(7, QuitDriver);
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
