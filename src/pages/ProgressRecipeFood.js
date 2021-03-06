import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProgressRecipe.css';
import { useLocation } from 'react-router';
import CopyButton from '../components/CopyButton';
import FavoriteButton from '../components/FavoriteButton';
// www.themealdb.com/api/json/v1/1/lookup.php?i=52772
export default function ProgressRecipeFood({ match: { params: { id } } }) {
  const { pathname } = useLocation();
  const [meal, setMeal] = useState({});
  useEffect(() => {
    async function getMeal() {
      const dish = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const dishJson = await dish.json();
      const [fetchedMeal] = dishJson.meals;
      setMeal(fetchedMeal);
    }
    getMeal();
  }, [id]);
  const localStorageFavoriteRecipe = localStorage.favoriteRecipes
    && JSON.parse(localStorage.getItem('favoriteRecipes'))
      .some((recipe) => recipe.id === id);

  const loadRecipe = () => {
    // if (localStorage['inProgressRecipes']) {
    //   const setDiv = document.querySelector('#current-recipe');
    //   const divItemStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    //   setDiv.innerHTML = divItemStorage;
    // }
  };

  window.onload = async function onload() {
    loadRecipe();
  };

  // useEffect(() => {
  //   if (localStorage[id]) {
  //     const element = JSON.parse(localStorage.getItem(id));
  //     document.getElementById(id).innerHTML = element;
  //     // return (element);
  //   }
  // });

  const MAX_INGREDIENTS = 20;
  const [numbers, ingredients,
    measures] = [[], [], []]; /* Três arrays vazios */
  /* Numbers preenchido com números de 1 a 20 */
  for (let index = 0; index < MAX_INGREDIENTS; index += 1) {
    numbers.push(index + 1);
  }
  /* ingredients e measures preenchidos com nomes das chaves "strIngredient" e */
  /* strMeasures de 1 a 20. */
  numbers.forEach((num) => ingredients.push(`strIngredient${num}`));
  numbers.forEach((num) => measures.push(`strMeasure${num}`));

  // function saveDiv() {
  //   const setDiv = document.querySelector('#current-recipe');
  //   localStorage.setItem('inProgressRecipes', JSON.stringify(setDiv.innerHTML));
  // }
  function checkIngredient({ target }) {
    target.nextSibling.className = target.checked
      ? 'checkedIngredient' : 'uncheckedIngredient';
  }

  function renderCheckBox() {
    return (
      <div>
        {
          numbers
            .filter((num) => Boolean(meal[ingredients[num - 1]]))
            .map((num) => (
              <div key={ `section-${num - 1}` }>
                <label
                  htmlFor={ `${num - 1}-ingredient-check` }
                  data-testid={ `${num - 1}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={ `${num - 1}-ingredient-check` }
                    value={ num - 1 }
                    defaultChecked
                    onChange={ ({ target }) => !target.checked }
                    onClick={ checkIngredient }
                  />
                  <span>
                    { `${meal[measures[num - 1]]} ${meal[ingredients[num - 1]]}` }
                  </span>
                </label>
                <br />
              </div>
            ))
        }
      </div>
    );
  }
  return (
    <div className="card">
      <div id="current-recipe">
        <img
          className="card-img-top"
          width="100%"
          height="100%"
          data-testid="recipe-photo"
          src={ `${meal.strMealThumb}` }
          alt="dish"
        />
        <div className="card-body">
          <h1 className="card-title" data-testid="recipe-title">{ meal.strMeal }</h1>
          <CopyButton pathname={ pathname } typeUrl={ `comidas/${id}` } />
          <FavoriteButton
            cardFavorite={ meal }
            type="Meal"
            favorite={ localStorageFavoriteRecipe }
          />
          <p data-testid="recipe-category">{ meal.strCategory }</p>
          {renderCheckBox()}
          <p
            data-testid="instructions"
            className="instructions card-text"
          >
            { meal.strInstructions }

          </p>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid="finish-recipe-btn"
          >
            Receita Finalizada

          </button>
        </div>
      </div>
    </div>
  );
}
ProgressRecipeFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
