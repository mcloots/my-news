import { createReducer, on } from '@ngrx/store';
import {authenticatedUser} from '../actions/user.actions';
import {User} from '../../security/user';

//export const initialState: User = {id: 0, email: '', password: '', token: ''};
export const initialState: ReadonlyArray<User> = [];

const _userReducer = createReducer(
  initialState,
  on(authenticatedUser, (state, { user }) => {
    return [...user];
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}

