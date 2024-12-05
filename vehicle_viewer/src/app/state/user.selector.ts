import { createSelector } from '@ngrx/store';
import { GlobalState } from './global.state';
import { selectGlobalState } from './global.selector';

export const selectUserRole = createSelector(
  selectGlobalState,
  (state: GlobalState) => state.user
);
