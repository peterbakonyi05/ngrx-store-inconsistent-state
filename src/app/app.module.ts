import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { OrderEffects } from './effects/order';
import { AppComponent } from './containers/app';
import { reducer } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(OrderEffects)
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }