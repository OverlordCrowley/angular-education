import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideStore} from "@ngrx/store";
import {reducers} from "./store";
import {provideEffects} from "@ngrx/effects";
import {UserEffects} from "./store/effects/user.effects";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(reducers), provideEffects(UserEffects)]
};
