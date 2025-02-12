import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import LoginScreen from '../../../pages/LoginScreen';

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

describe('LoginScreen screen', () => {
  it('should render the LoginScreen', () => {
    const player = mockDividedPlayers.kaotika[0];
    
    render(<LoginScreen
      email={player.email}
      setEmail={() => {}}
      setIsLoggedIn={() => {}}
      setPlayer={() => {}}
    />);

    const loginScreen = screen.getByTestId('login-screen');
    expect(loginScreen).toBeInTheDocument();
  });
});
