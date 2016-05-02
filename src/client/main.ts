///<reference path="typings/moment/moment.d.ts" />

import {bootstrap} from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {environment} from './app/environment';
import {FlightsApp} from './app/flights';


if (environment.production) {
  enableProdMode();
}

bootstrap(FlightsApp);
