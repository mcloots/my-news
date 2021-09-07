import {createAction, props} from '@ngrx/store';
import {User} from '../../security/user';

export const authenticatedUser = createAction('[Security Component] Authenticated', props<{ user: User[] }>());
