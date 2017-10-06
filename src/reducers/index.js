import { combineReducers } from 'redux';
import calendar from './calendar';
import food from './food';

export default combineReducers({
  calendar,
  food,
});
