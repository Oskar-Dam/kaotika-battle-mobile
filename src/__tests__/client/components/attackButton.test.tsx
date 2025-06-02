import * as React from 'react';
React; //Add this line to disable the unused variable error for Vercel deployment
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AttackButton from '../../../components/AttackButton';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import useStore from '../../../store/useStore';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
});

jest.mock('../../../store/useStore');

jest.mock('./../../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('AttackButton Component', () => {
  it('should render the AttackButton', () => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      player: mockDividedPlayers.kaotika[0],
      selectedPlayer: mockDividedPlayers.dravokar[1],
      setSelectedPlayer: jest.fn(),
    });

    render(<AttackButton />);
    const buttonElement = screen.getByTestId('attack-button');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should be enabled if its your turn', () => {
    const mockStore = { 
      player: mockDividedPlayers.kaotika[0],
      selectedPlayer: mockDividedPlayers.dravokar[1],
      setSelectedPlayer: jest.fn(),
      isMyTurn: true,
    };
    (useStore as unknown as jest.Mock).mockReturnValue(mockStore);

    render(<AttackButton />);

    const buttonElement = screen.getByTestId('attack-button');
    expect(buttonElement).not.toBeDisabled();
  });

  it('should be disabled if its not your turn', () => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      player: mockDividedPlayers.kaotika[0],
      selectedPlayer: null,
      setSelectedPlayer: jest.fn(),
    });

    render(<AttackButton />);

    const buttonElement = screen.getByTestId('attack-button');
    expect(buttonElement).toBeDisabled();
  });
});
