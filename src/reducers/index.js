import {
  ADD_RECIPE,
  REMOVE_FROM_CALENDAR,
} from "../actions";
import { combineReducers } from 'redux';

const foodReducer = (state={}, action) => {
  switch(action.type) {
    case ADD_RECIPE:
      const { recipe } = action;
      return {
        ...state,
        [recipe.label]: recipe,
      };
    default:
      return state;
  }
};

const INITIAL_MENU = {
  breakfast: null,
  lunch: null,
  dinner: null,
};

const initialCalendarState = {
  sunday: { ...INITIAL_MENU },
  monday: { ...INITIAL_MENU },
  tuesday: { ...INITIAL_MENU },
  wednesday: { ...INITIAL_MENU },
  thursday: { ...INITIAL_MENU },
  friday: { ...INITIAL_MENU },
  saturday: { ...INITIAL_MENU },
};

const calendarReducer = (state=initialCalendarState, action) => {
  const { day, recipe, meal } = action;
  switch(action.type) {
    case ADD_RECIPE:
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      };
    case REMOVE_FROM_CALENDAR:
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      };
    default:
      return state;
  }
};

export default combineReducers({
  calendar: calendarReducer,
  food: foodReducer,
});
