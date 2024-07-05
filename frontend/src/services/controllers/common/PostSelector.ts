import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

const selectPost = (state: RootState) => state.post;

export const selectPostPassword = createSelector(selectPost, (post) => post.password);
