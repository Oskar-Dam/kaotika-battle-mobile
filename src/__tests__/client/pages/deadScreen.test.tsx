import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeadScreen from '../../../pages/DeadScreen';

jest.mock('../../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar advertencias
});

describe('DeadScreen screen', () => {
  it('should render the DeadScreen', () => {
    
    render(<DeadScreen/>);

    const deadScreen = screen.getByTestId('dead-screen');
    expect(deadScreen).toBeInTheDocument();
  });
});
