import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const selectUser = (state: RootState) => state.user;

export const selectUserId = createSelector(selectUser, (user) => user.id);
export const selectUserRole = createSelector(selectUser, (user) => user.role);
export const selectToken = createSelector(selectUser, (user) => user.token);
