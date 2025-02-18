import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BattleScreen from '../../../pages/BattleScreen';
import { mockPotions } from '../../../__mocks__/mockPotions';
import useStore from '../../../store/useStore';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';

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

describe('BattleScreen screen', () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      player: mockDividedPlayers.kaotika[0],
      setSelectedPlayer: jest.fn(),
    });
  });
  it('should render the BattleScreen', () => {
    const potions = mockPotions;
    
    render(<BattleScreen
      potions={potions}
    />);

    const battleScreen = screen.getByTestId('battle-screen');
    expect(battleScreen).toBeInTheDocument();
  });
});
