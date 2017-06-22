import { UsbMonMonPage } from './app.po';

describe('usb-mon-mon App', () => {
  let page: UsbMonMonPage;

  beforeEach(() => {
    page = new UsbMonMonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('umm works!');
  });
});
