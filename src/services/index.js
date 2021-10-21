// Objeto que possui as URL padrao de cada tipo de API;
const endPoints = {
  foods: 'https://www.themealdb.com/api/json/v1/1/',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/',
};

// Funcao que auxilia na requisicao de uma API;
export async function getResponse(URL) {
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    return 'Error';
  }
}

// Requisição padrão;
export const getDefaultData = (type) => {
  const apiURL = `${endPoints[type]}search.php?s=`;
  return getResponse(apiURL);
};

// Funcao que realizará uma requisicao para a API com os parametros selecionados e retornará o resultado ou um erro;
export async function fetchApiRecipes(filterSelect, text, type) {
  let url = `${endPoints[type]}search.php?`;
  if (filterSelect === 'i') url = `${endPoints[type]}filter.php?`;

  const fetchUrl = `${url}${filterSelect}=${text}`;
  return getResponse(fetchUrl);
}

// Funcao que retorna os detalhes de uma receita de acordo com o ID passado;
export async function getDetails(type, id) {
  const URL = endPoints[type];

  return getResponse(`${URL}lookup.php?i=${id}`);
}

export async function fetchApiRecipesFoodMain() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const fetchUrl = await fetch(url);
  let response;
  try {
    response = await fetchUrl.json();
  } catch (e) {
    response = 'ERROR';
  }
  return response;
}

export async function fetchApiRecipesDrinkMain() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const fetchUrl = await fetch(url);
  let response;
  try {
    response = await fetchUrl.json();
  } catch (e) {
    response = 'ERROR';
  }
  return response;
}

export async function fetchApiListFood() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const fetchUrl = await fetch(url);
  let response;
  try {
    response = await fetchUrl.json();
  } catch (e) {
    response = 'ERROR';
  }
  return response;
}
export async function fetchApiListDrink() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const fetchUrl = await fetch(url);
  let response;
  try {
    response = await fetchUrl.json();
  } catch (e) {
    response = 'ERROR';
  }
  return response;
}

export async function fetchApiCategoryFood(categoryOfFilter) {
  console.log(categoryOfFilter);

  const url = categoryOfFilter === 'All'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryOfFilter}`;
  const fetchUrl = await fetch(url);
  let request;
  try {
    request = await fetchUrl.json();
    return request;
  } catch (e) {
    request = 'ERROR';
  }
  return request;
}
export async function fetchApiCategoryDrink(categoryOfFilter) {
  const url = categoryOfFilter === 'All'
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryOfFilter}`;
  const fetchUrl = await fetch(url);
  let request;
  try {
    request = await fetchUrl.json();
    return request;
  } catch (e) {
    request = 'ERROR';
  }
  return request;
}
