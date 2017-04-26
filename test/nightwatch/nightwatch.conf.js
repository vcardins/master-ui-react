/* eslint camelcase: 0 */
/* eslint quote-props: 0 */
/* eslint no-console: 0 */
require('babel-core/register');
require('env2')('.env'); // optionally store youre Evironment Variables in .env
const PKG = require('../../package.json'); // so we can get the version of the project
const SCREENSHOT_PATH = `./screenshots/${PKG.version}/`;
const BINPATH = '../../node_modules/nightwatch/bin/';

// we use a nightwatch.conf.js file so we can include comments and helper functions
module.exports = {
  'src_folders': [
    'tests', // Where you are storing your Nightwatch e2e tests
  ],
  output_folder: './reports', // reports (test outcome) output by nightwatch
  selenium: { // downloaded by selenium-download module (see readme)
    'start_process': true, // tells nightwatch to start/stop the selenium process
    server_path: `${BINPATH}selenium.jar`,
    'host': '127.0.0.1',
    'port': 4444, // standard selenium port
    'cli_args': { // chromedriver is downloaded by selenium-download (see readme)
        'webdriver.chrome.driver' : `${BINPATH}chromedriver`,
    },
  },
  'test_workers' : {'enabled' : true, 'workers' : 'auto'}, // perform tests in parallel where possible
  'test_settings': {
    default: {
        'launch_url': 'http://localhost', // we're testing a Public or "staging" site on Saucelabs
        screenshots: {
            'enabled': true, // if you want to keep screenshots
            'path': SCREENSHOT_PATH, // save screenshots here
        },
        'globals': {
            'waitForConditionTimeout': 10000, // sometimes internet is slow so wait.
        },
        'desiredCapabilities': { // use Chrome as the default browser for tests
            browserName: 'chrome',
        },
    },
    'local': {
      'launch_url': 'http://localhost',
      'selenium_port': 4444,
      'selenium_host': '127.0.0.1',
      'silent': true,
      'screenshots': {
        'enabled': true, // save screenshots taken here
        'path': SCREENSHOT_PATH,
      }, // this allows us to control the
      'globals': {
        'waitForConditionTimeout': 15000, // on localhost sometimes internet is slow so wait...
      },
      'desiredCapabilities': {
        'browserName': 'chrome',
        'chromeOptions': {
          'args': [
            `Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46
            (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3`,
            '--window-size=640,1136', // iphone 5
          ],
        },
        'javascriptEnabled': true,
        'acceptSslCerts': true,
      },
    },
    'chrome': { // your local Chrome browser (chromedriver)
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true,
      },
    },
    'chromemac': { // browsers used on saucelabs:
      'desiredCapabilities': {
        'browserName': 'chrome',
        'platform': 'OS X 10.11',
        'version': '47',
      },
    },
    'ie11': {
      'desiredCapabilities': {
        'browserName': 'internet explorer',
        'platform': 'Windows 10',
        'version': '11.0',
      },
    },
    'firefox' : {
      'desiredCapabilities': {
        'platform': 'XP',
        'browserName': 'firefox',
        'version': '33',
      },
    },
    'internet_explorer_10' : {
      'desiredCapabilities': {
        'platform': 'Windows 7',
        'browserName': 'internet explorer',
        'version': '10',
      },
    },
  },
}
/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */

require('fs').stat(`${BINPATH}selenium.jar`, (err, stat) => { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, (error) => {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});

function padLeft (count) { // theregister.co.uk/2016/03/23/npm_left_pad_chaos/
  return count < 10 ? `0${  count}` : count.toString();
}

let FILECOUNT = 0; // "global" screenshot file count
/**
 * The default is to save screenshots to the root of your project even though
 * there is a screenshots path in the config object above! ... so we need a
 * function that returns the correct path for storing our screenshots.
 * While we're at it, we are adding some meta-data to the filename, specifically
 * the Platform/Browser where the test was run and the test (file) name.
 */
function getImagePath (browser) {
  const a = browser.options.desiredCapabilities;
  const meta = [a.platform];
  meta.push(a.browserName ? a.browserName : 'any');
  meta.push(a.version ? a.version : 'any');
  meta.push(a.name); // this is the test filename so always exists.
  const metadata = meta.join('~').toLowerCase().replace(/ /g, '');
  return `${SCREENSHOT_PATH + metadata  }_${  padLeft(FILECOUNT++)  }_`;
}

module.exports.getImagePath = getImagePath;
module.exports.SCREENSHOT_PATH = SCREENSHOT_PATH;