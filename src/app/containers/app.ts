import 'rxjs/add/operator/let';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="wrongOrderOfReducerAndEffect()">REDUCER-EFFECT Issue</button>
    <button (click)="wrongOrderOfState()">STATE Issue</button>
  `
})
export class AppComponent {
  subscriptions: Subscription[] = [];

  constructor(private store: Store<any>) {
  }

  wrongOrderOfReducerAndEffect() {
    this.init();

    console.error('ISSUE: second effect will run before the second reducer');

    this.subscriptions.push(this.store
      .subscribe((data: any) => {
        if (data.length === 2) {
          this.store.dispatch({ type: 'SECOND' });
        }
        console.log('SUBSCRIBER: ', data);
      }));

    this.store.dispatch({ type: 'FIRST' });
  }

  wrongOrderOfState() {
    this.init();

    console.error('ISSUE: after getting 2 state changes, we get the initial state');

    let did = false; // dirty way to make sure we dispatch first once

    this.subscriptions.push(
      this.store.do(() => {
        if (!did) {
          did = true;
          this.store.dispatch({ type: 'FIRST' });
        }
      })
        .subscribe((data: any) => {
          if (!data.length) {
          }
          console.log('SUBSCRIBER: ', data);
        }));

    this.store.dispatch({ type: 'SECOND' });
  }

  init() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
    this.store.dispatch({ type: 'INIT' });
  }
}
