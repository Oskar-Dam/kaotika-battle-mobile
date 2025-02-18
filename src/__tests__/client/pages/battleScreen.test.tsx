import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useStore from '../../../store/useStore';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import BattleScreen from '../../../pages/BattleScreen';

jest.mock('../../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

jest.mock('../../../store/useStore');

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar advertencias
});

beforeEach(() => {
  (useStore as unknown as jest.Mock).mockReturnValue({
    player: mockDividedPlayers.kaotika[0],
    kaotikaPlayers: mockDividedPlayers.kaotika || [],
    dravokarPlayers: mockDividedPlayers.dravokar || [],
    setSelectedPlayerIndex: jest.fn(),
    setSelectedPlayer: jest.fn(),
  });
});

describe('BattleScreen screen', () => {
  it('should render the BattleScreen', () => {
    render(<BattleScreen/>);
    screen.debug();
    const battleScreen = screen.getByTestId('battle-screen');
    expect(battleScreen).toBeInTheDocument();
  });
});
