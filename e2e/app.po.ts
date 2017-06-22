import { browser, by, element } from 'protractor';

export class UsbMonMonPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('umm-root h1')).getText();
  }
}
