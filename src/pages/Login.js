import PropTypes from 'prop-types';
import React from 'react';
import { useRecipesContext } from '../context/Provider';
import '../css/login.css';

export default function Login({ history }) {
  const { login, setLogin } = useRecipesContext();
  function handleChange(event) {
    return setLogin({ ...login, [event.target.name]: event.target.value });
  }

  function handleClick() {
    const userEmail = { email: login.email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(userEmail));
    history.push('/comidas');
  }
  const number = 6;
  let handleButton = true;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(login.email) && login.password.length > number) {
    handleButton = false;
  }
  return (
    <div className="login">
      <h1>Receitas do grupo 9</h1>
      <form action="" className="form">
        <div>
          <label htmlFor="email">
            email:
            <input
              className="login form-control"
              onChange={ handleChange }
              type="text"
              name="email"
              id="email"
              data-testid="email-input"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            senha:
            <input
              className="password form-control"
              onChange={ handleChange }
              type="password"
              name="password"
              id="password"
              data-testid="password-input"
            />
          </label>
        </div>
        <button
          className="buttonLogin btn btn-dark"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ handleButton }
          type="button"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.objectOf().isRequired,
};
