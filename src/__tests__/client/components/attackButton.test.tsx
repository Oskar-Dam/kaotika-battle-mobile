import * as React from 'react';
React; //Add this line to disable the unused variable error for Vercel deployment
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AttackButton from '../../../components/AttackButton';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
});

describe('AttackButton Component', () => {
  it('should render the AttackButton', () => {
    const player = mockDividedPlayers.kaotika[0];

    render(<AttackButton
      onClick={() => {}}
      isMyTurn={true}
      selectedPlayer={player}
      player={player}
    />);

    const buttonElement = screen.getByTestId('attack-button');
    expect(buttonElement).toBeInTheDocument();
  });
  it('should be enabled and have saturation when attacking is allowed', () => {
    const attacker = mockDividedPlayers.kaotika[0];
    const target = mockDividedPlayers.dravokar[0];

    render(<AttackButton
      onClick={() => {}}
      isMyTurn={true}
      selectedPlayer={target}
      player={attacker}
    />);

    const buttonElement = screen.getByTestId('attack-button');
    expect(buttonElement).not.toBeDisabled();
    expect(buttonElement).toHaveStyle('filter: saturate(1)');
  });
  it('should be disabled and have no saturation when attacking is not allowed', () => {
    const attacker = mockDividedPlayers.kaotika[0];
    const target = mockDividedPlayers.kaotika[1];

    render(<AttackButton
      onClick={() => {}}
      isMyTurn={true}
      selectedPlayer={target}
      player={attacker}
    />);

    const buttonElement = screen.getByTestId('attack-button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveStyle('filter: saturate(0)');
  });
  it('should be disabled when it is not the player turn', () => {
    const attacker = mockDividedPlayers.kaotika[0];
    const target = mockDividedPlayers.dravokar[0];

    render(<AttackButton
      onClick={() => {}}
      isMyTurn={false}
      selectedPlayer={target}
      player={attacker}
    />);

    const buttonElement = screen.getByTestId('attack-button');
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveStyle('filter: saturate(0)');
  });
});
