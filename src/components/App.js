import React, { Component } from 'react';
import { addReceipe } from "../actions";

class App extends Component {
  state = {
    calendar: null,
    inputValue: 'Hi there'
  };

  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      this.setState(() => ({
        calendar: store.getState()
      }));
    });
  }

  submitFood = () => {
    const { store } = this.props;
    store.dispatch(addReceipe({
      day: 'monday',
      meal: 'breakfast',
      recipe: {
        label: this.state.inputValue
      }
    }));

    this.setState({ inputValue: '' });
  };


  _onChangeInput = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const { inputValue, calendar } = this.state;
    return (
      <div>
        <h2>Meal Planner</h2>
        <input
          type='text'
          onChange={this._onChangeInput}
          value={inputValue}
          placeholder="Monday's breakfast"
        />
        <button type='button' onClick={this.submitFood}>Submit</button>
        <pre>
          Monday's Breakfast: {calendar && calendar.monday.breakfast}
        </pre>
      </div>
    );
  }
}

export default App;
