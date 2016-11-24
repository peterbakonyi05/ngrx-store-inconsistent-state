import { Action } from '@ngrx/store';

export type State = string[];

const initialState = [];

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case 'INIT': {
            return initialState;
        }

        case 'FIRST':
        case 'FIRST_COMPLETE':
        case 'SECOND':
        case 'SECOND_COMPLETE': {
            console.log(`REDUCER: ${action.type}`);
            return state.concat(action.type);
        }

        default: {
            return state;
        }
    }
}