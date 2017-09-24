import React, { Component } from 'react';
import { addRecipe, removeFromCalendar } from "../actions";
import { connect } from 'react-redux'

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h2>Meal Planner</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return {
    calendar: dayOrder.map(day => ({
      day,
      meals: Object.keys(state[day]).reduce((meals, meal) => {
        meals[meal] = state[day][meal] ? state[day][meal] : null;
        return meals;
      }, {})
    })),
  };
};

const mapDispatchToProps = (dispatch) => ({
  selectRecipe: (data) => dispatch(addRecipe(data)),
  remove: (data) => dispatch(removeFromCalendar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
