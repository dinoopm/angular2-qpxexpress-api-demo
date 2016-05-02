export class FlightsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('flights-app p')).getText();
  }
}
