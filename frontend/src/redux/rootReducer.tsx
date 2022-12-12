import { combineReducers } from '@reduxjs/toolkit';
import applicationsReducer from './applications/applications.reducer';

const rootReducer = combineReducers({
  applications: applicationsReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;