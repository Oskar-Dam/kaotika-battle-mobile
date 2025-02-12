import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import BattleScreen from '../../../pages/BattleScreen';
import { mockPotions } from '../../../__mocks__/mockPotions';

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

describe('BattleScreen screen', () => {
  it('should render the BattleScreen', () => {
    const player = mockDividedPlayers.kaotika[0];
    const potions = mockPotions;
    
    render(<BattleScreen
      potions={potions}
      player={player}
      setPlayer={() => player}
      isMyTurn={true}
      setIsMyTurn={() => true}
      setIsLoggedIn={() => true}
      setEmail={() => player.email}
    />);

    const battleScreen = screen.getByTestId('battle-screen');
    expect(battleScreen).toBeInTheDocument();
  });
});
