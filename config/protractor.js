exports.config = {
  specs: ['../test/e2e/**/*.js'],
  onPrepare: function() {
    browser.driver.get('http://localhost:3000');
    element(by.id('entrar')).click();
    browser.driver.findElement(by.id('login_field')).sendKeys('dolfao@gmail.com');
    browser.driver.findElement(by.id('password')).sendKeys('*9Dobocchi');
    browser.driver.findElement(by.name('commit')).click();  
  }
};