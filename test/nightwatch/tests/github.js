const conf = require('../nightwatch.conf.js');

module.exports = {
  'Demo test GitHub' (browser) {
    browser
      .url('http://www.github.com/dwyl')   // visit the url
      .waitForElementVisible('body'); // wait for the body to be rendered
      // check if we are seeing the Mobile Version of GitHub
      browser.element('css selector', '.switch-to-desktop', (result) => {
        if (result.status !== -1) { //Element exists, do something
          browser.click('.switch-to-desktop')
          .waitForElementVisible('body'); // wait for the body to be rendered
        }
      });
    // part two:
    browser
      .assert.containsText('body', 'Pinned repositories') // assert contains
      .saveScreenshot(`${conf.getImagePath(browser)  }dwyl.png`)
      .end();
  },
};
