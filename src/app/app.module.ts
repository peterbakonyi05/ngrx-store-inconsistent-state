import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { Effects } from './effect';
import { reducer } from './reducer';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(Effects)
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }