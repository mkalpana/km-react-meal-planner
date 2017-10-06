import React, { Component } from 'react';
import { addRecipe, removeFromCalendar } from "../actions";
import { connect } from 'react-redux';
import { capitalize } from 'lodash';
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import { fetchRecipes } from '../utils/api';
import ShoppingList from './ShoppingList';
import Modal from './Modal';
import FoodSearch from "./FoodSearch";

class App extends Component {
  state = {
    isFoodModalOpen: false,
    isIngredientsModalOpen: false,
    meal: null,
    day: null,
    food: null,
    foodSearchInput: '',
  };
  
  openFoodModal = ({ meal, day }) => {
    this.setState(() => ({
      isFoodModalOpen: true,
      meal,
      day,
      foodSearchInput: '',
    }));
  };

  closeFoodModal = () => {
    this.setState(() => ({
      isFoodModalOpen: false,
      meal: null,
      day: null,
      food: null,
      foodSearchInput: '',
    }));
  };

  onInputChange = (e) => {
    this.setState({ foodSearchInput: e.target.value });
  };
  
  searchFood = (e) => {
    if (!this.state.foodSearchInput) {
      return;
    }

    e.preventDefault();

    this.setState(() => ({ loadingFood: true }));

    fetchRecipes(this.state.foodSearchInput)
      .then((food) => this.setState(() => ({
        food,
        loadingFood: false,
      })));
  };


  openIngredientsModal = () => this.setState(() => ({ isIngredientsModalOpen: true }));

  closeIngredientsModal = () => this.setState(() => ({ isIngredientsModalOpen: false }));

  generateShoppingList = () => {
    return this.props.calendar.reduce((result, { meals }) => {
      const { breakfast, lunch, dinner } = meals;

      breakfast && result.push(breakfast);
      lunch && result.push(lunch);
      dinner && result.push(dinner);

      return result;
    }, [])
      .reduce((ings, { ingredientLines }) => ings.concat(ingredientLines), []);
  };
  
  render() {
    const { isFoodModalOpen, isIngredientsModalOpen, loadingFood, food, day, meal } = this.state;
    const { calendar, selectRecipe, remove } = this.props;
    const mealOrder = ['breakfast', 'lunch', 'dinner'];
    return (
      <div className="container">

        <div className='nav'>
          <h1 className='header'>Meal Planner</h1>
          <button
            className='shopping-list'
            onClick={this.openIngredientsModal}>
            Shopping List
          </button>
        </div>

        <ul className="meal-types">
          {
            mealOrder.map(mealType => <li key={mealType} className="subheader">{capitalize(mealType)}</li>)
          }
        </ul>

        <div className='calendar'>
          <div className='days'>
            {calendar.map(({ day }) => <h3 key={day} className='subheader'>{capitalize(day)}</h3>)}
          </div>
          <div className='icon-grid'>
            {calendar.map(({ day, meals }) => (
              <ul key={day}>
                {mealOrder.map((meal) => (
                  <li key={meal} className='meal'>
                    {meals[meal]
                      ? <div className='food-item'>
                        <img src={meals[meal].image} alt={meals[meal].label}/>
                        <button onClick={() => remove({meal, day})}>Clear</button>
                      </div>
                      : <button onClick={() => this.openFoodModal({meal, day})} className='icon-btn'>
                        <CalendarIcon size={30}/>
                      </button>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <Modal label="Food Search Modal" isOpen={isFoodModalOpen} onClose={this.closeFoodModal}>
          <FoodSearch
            isLoading={loadingFood}
            selectRecipe={selectRecipe}
            searchFood={this.searchFood}
            onInputChange={this.onInputChange}
            food={food}
            day={day}
            meal={meal}
            onClose={this.closeFoodModal}
          />
        </Modal>

        <Modal label="Shopping List Modal" isOpen={isIngredientsModalOpen} onClose={this.closeIngredientsModal}>
          <ShoppingList list={this.generateShoppingList()}/>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ calendar, food }) => {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return {
    calendar: dayOrder.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal] ? food[calendar[day][meal]] : null;
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
