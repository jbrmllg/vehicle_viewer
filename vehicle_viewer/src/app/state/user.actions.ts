import { createAction, props } from '@ngrx/store';
import { Roles } from '../common/types';

export const setRole = createAction(
  '[Auth] Set Role',
  props<{ user: Roles }>()
);

export const clearRole = createAction('[Auth] Clear Role');