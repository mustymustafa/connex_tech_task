import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test("renders home page without crashing", () => {
  render(<App />);
});
