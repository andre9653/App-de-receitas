import React from 'react';
import { Route, Switch } from 'react-router';
import Provider from '../context/Provider';
import FoodRecipes from './FoodRecipes';
import DrinkRecipes from './DrinkRecipes';
import Explore from './Explore';
import Login from './Login';
import ExploreFood from './ExploreFood';
import ExploreDrink from './ExploreDrink';
import ExploreIngredientFood from './ExploreIngredientFood';
import ExploreIngredientDrink from './ExploreIngredientDrink';
import ExploreFoodArea from './ExploreFoodArea';
import Perfil from './Perfil';
import DoneRecipe from './DoneRecipe';
import FavoriteRecipe from './FavoriteRecipe';
import ProgressRecipeFood from './ProgressRecipeFood';
import ProgressRecipeDrink from './ProgressRecipeDrink';
import DetailsRecipe from './DetailsRecipe';

export default function Recipes() {
  return (
    <div className="page-initial">
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ FoodRecipes } />
          <Route exact path="/bebidas" component={ DrinkRecipes } />
          <Route exact path="/comidas/:id">
            <DetailsRecipe />
          </Route>
          <Route exact path="/bebidas/:id">
            <DetailsRecipe />
          </Route>
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ ProgressRecipeFood }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ ProgressRecipeDrink }
          />
          <Route exact path="/explorar" component={ Explore } />
          <Route exact path="/explorar/comidas" component={ ExploreFood } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrink } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreIngredientFood }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreIngredientDrink }
          />
          <Route
            exact
            path="/explorar/comidas/area"
            component={ ExploreFoodArea }
          />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ DoneRecipe } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipe } />
        </Switch>
      </Provider>
    </div>
  );
}
