import { FlightsPage } from './app.po';

describe('flights App', function() {
  let page: FlightsPage;

  beforeEach(() => {
    page = new FlightsPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('flights Works!');
  });
});
