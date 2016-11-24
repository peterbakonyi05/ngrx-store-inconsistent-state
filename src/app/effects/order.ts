import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions) { }

  @Effect()
  first$: Observable<Action> = this.actions$
    .ofType('FIRST', 'SECOND')
    .map(action => {
      console.log(`EFFECT: ${action.type}`);
      return { type: `${action.type}_COMPLETE`};
  });
}
