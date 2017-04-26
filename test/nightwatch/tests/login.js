module.exports = {
  beforeEach: (browser) => {
    browser
      .url('http://localhost:5555')
      .waitForElementVisible('body')
      .waitForElementVisible('#app > div');
  },
  'Smoke test': (browser) => {
    browser
      .assert.visible('#app > div', 'Check if app has rendered with React')
      .assert.title('Master UI');
  },
  after: (browser) => browser.end(),
};
