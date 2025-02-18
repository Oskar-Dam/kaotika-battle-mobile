import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PotionContainer from '../../../components/PotionContainer';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar advertencias
});

describe('PotionContainer Component', () => {
  it('should render the PotionContainer', () => {
    
    render(<PotionContainer
      onClick={() => {}}
    />);

    const modalComponent = screen.getByTestId('potion-container');
    expect(modalComponent).toBeInTheDocument();
  });
});
