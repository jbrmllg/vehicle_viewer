import { createAction, props } from '@ngrx/store';

export const setRole = createAction(
  '[Auth] Set Role',
  props<{ user: string }>()
);

export const clearRole = createAction('[Auth] Clear Role');