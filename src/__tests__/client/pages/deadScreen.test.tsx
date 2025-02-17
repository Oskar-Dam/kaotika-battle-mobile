import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import DeadScreen from '../../../pages/DeadScreen';
React;

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar advertencias
});

jest.mock('../../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

describe('DeadScreen screen', () => {
  it('should render the DeadScreen for role -ACOLYTE- ', () => {
    
    render(<DeadScreen role='acolyte'/>);

    const deadScreen = screen.getByTestId('dead-screen');
    expect(deadScreen).toBeInTheDocument();
  });
  it('should render the DeadScreen for role -MORTIMER- ', () => {
    
    render(<DeadScreen role='mortimer'/>);

    const deadScreen = screen.getByTestId('dead-screen');
    expect(deadScreen).toBeInTheDocument();
  });
});
