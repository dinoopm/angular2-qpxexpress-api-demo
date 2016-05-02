import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {FlightsApp} from '../app/flights';

beforeEachProviders(() => [FlightsApp]);

describe('App: Flights', () => {
  it('should have the `defaultMeaning` as 42', inject([FlightsApp], (app: FlightsApp) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([FlightsApp], (app: FlightsApp) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

