import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();
  // criação do proprio historico para provocar um not found
  const returnFromRender = render(
    <Router history={ customHistory }>
      { componentToRender }
    </Router>,
  );

  return {
    ...returnFromRender,
    history: customHistory,
  };
}

export default renderWithRouter;
