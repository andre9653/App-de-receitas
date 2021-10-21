import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProgressRecipe.css';
import { useLocation } from 'react-router';
import CopyButton from '../components/CopyButton';
import FavoriteButton from '../components/FavoriteButton';
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007
export default function ProgressRecipeDrink({ match: { params: { id } } }) {
  const localStorageFavoriteRecipe = localStorage.favoriteRecipes
  && JSON.parse(localStorage.getItem('favoriteRecipes'))
    .some((recipe) => recipe.id === id);

  const { pathname } = useLocation();
  const [drink, setDrink] = useState({});
  const [check, setCheck] = useState(0);
  const [allCheck, setAllCheck] = useState(true);
  useEffect(() => {
    async function getDrink() {
      const site = 'https://www.thecocktaildb.com';
      const beverage = await fetch(`${site}/api/json/v1/1/lookup.php?i=${id}`);
      const beverageJson = await beverage.json();
      const [fetchedDrink] = beverageJson.drinks;
      setDrink(fetchedDrink);
    }
    getDrink();
  }, [id]);

  const MAX_INGREDIENTS = 15;
  const [numbers, ing, measures] = [[], [], []]; /* Três arrays vazios */
  /* Numbers preenchido com números de 1 a 15 */
  for (let index = 0; index < MAX_INGREDIENTS; index += 1) {
    numbers.push(index + 1);
  }
  /* ingredients e measures preenchidos com nomes das chaves "strIngredient" e */
  /* strMeasures de 1 a 15. */
  numbers.forEach((num) => ing.push(`strIngredient${num}`));
  numbers.forEach((num) => measures.push(`strMeasure${num}`));

  function checkIngredient({ target }) {
    target.nextSibling.className = target.checked
      ? 'checkedIngredient' : 'uncheckedIngredient';
    setCheck(check + 1);
  }

  useEffect(() => {
    const elements = document.querySelectorAll('span');
    const validation = [];
    elements.forEach((elementDom) => {
      validation.push(elementDom.classList.contains('checkedIngredient'));
    });
    setAllCheck(validation.every((bol) => bol));
  }, [check]);

  return (
    <div className="card">
      <div id="current-recipe">
        <img
          className="card-img-top"
          width="100%"
          height="100%"
          data-testid="recipe-photo"
          src={ `${drink.strDrinkThumb}` }
          alt="drink"
        />
        <div className="card-body">
          <h1 className="card-title" data-testid="recipe-title">{ drink.strDrink }</h1>
          <CopyButton pathname={ pathname } typeUrl={ `bebidas/${id}` } />
          <FavoriteButton
            cardFavorite={ drink }
            type="Drink"
            favorite={ localStorageFavoriteRecipe }
          />
          <p data-testid="recipe-category">{ drink.strCategory }</p>
          <div>
            {
              numbers
                .filter((num) => (
                  Boolean(drink[ing[num - 1]])
              || Boolean(drink[measures[num - 1]])
                ))
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
                      <span className="checkedIngredient">
                        {
                          `${drink[measures[num - 1]] || ''} ${drink[ing[num - 1]] || ''}`
                        }
                      </span>
                    </label>
                    <br />
                  </div>
                ))
            }
          </div>
          <p
            data-testid="instructions"
            className="instructions card-text"
          >
            { drink.strInstructions }

          </p>
          <button
            className="btn btn-outline-dark"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !allCheck }
          >
            Receita Finalizada

          </button>
        </div>
      </div>
    </div>
  );
}
ProgressRecipeDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
