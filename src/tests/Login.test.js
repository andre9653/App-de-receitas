import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';
describe(`1 - Crie uma página inicial de
login com os seguintes campos e características:`, () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouter(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
  test('Crie um botão com o texto \'Entrar\'', () => {
    renderWithRouter(<App />);
    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });
});
describe(`2 - Realize as seguintes verificações
nos campos de email, senha e botão:`, () => {
  test('O botão de "Entrar" está desabilitado ao entrar na página', () => {
    renderWithRouter(<App />, '/');
    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();
  });
  test('O botão de "Entrar está desabilitado quando um email inválido é digitado', () => {
    renderWithRouter(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);
    userEvent.type(email, 'email');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
    userEvent.type(email, 'email@com@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
  });
  test('O botão de "Entrar"'
  + 'está desabilitado quando uma senha inválida é digitada', () => {
    renderWithRouter(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, '2345');
    expect(button).toBeDisabled();
  });
  test('O botão de "Entrar"'
  + 'está habilitado quando um email e uma senha válidos são passados', () => {
    renderWithRouter(<App />, '/');
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByText(/Entrar/i);
    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });
});
