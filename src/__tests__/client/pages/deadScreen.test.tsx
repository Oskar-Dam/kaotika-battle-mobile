import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import DeadScreen from '../../../pages/DeadScreen';
import useStore from '../../../store/useStore';

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

jest.mock('../../../store/useStore');

describe('DeadScreen screen', () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      player: mockDividedPlayers.kaotika[0],
      setSelectedPlayer: jest.fn(),
    });
  });
  it('should render the DeadScreen for role -ACOLYTE- ', () => {
    
    render(<DeadScreen />);

    const deadScreen = screen.getByTestId('dead-screen');
    expect(deadScreen).toBeInTheDocument();
  });
}); 
