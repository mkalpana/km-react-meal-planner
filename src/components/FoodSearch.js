import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import FoodList from './FoodList';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right';
import Loading from 'react-loading';

const FoodSearch = ({ isLoading, selectRecipe, onInputChange, searchFood, food, day, meal, onClose }) => {
  return (
    <div>
      <div className='search-container'>
        <h3 className='subheader'>
          Find a meal for {capitalize(day)} {meal}.
        </h3>
        {isLoading
          ? <Loading delay={200} type='spin' color='#222' className='loading' />
          : <div>
            <div className='search'>
              <input
                className='food-input'
                type='text'
                placeholder='Search Foods'
                onChange={onInputChange}
                onKeyDown={(e) => e.key === 'Enter' && searchFood(e)}
                autoFocus
              />
              <button
                className='icon-btn'
                onClick={searchFood}>
                <ArrowRightIcon size={30}/>
              </button>
            </div>
            {
              food && (
                <FoodList
                  food={food}
                  onSelect={(recipe) => {
                    selectRecipe({ recipe, day, meal });
                    onClose();
                  }}
                />
              )
            }
          </div>
        }
      </div>
    </div>
  );
};
FoodSearch.propTypes = {
  isLoading: PropTypes.bool,
  selectRecipe: PropTypes.func,
  onInputChange: PropTypes.func,
  searchFood: PropTypes.func,
  food: PropTypes.array,
  day: PropTypes.string,
  meal: PropTypes.string,
  onClose: PropTypes.func,
};
export default FoodSearch;
