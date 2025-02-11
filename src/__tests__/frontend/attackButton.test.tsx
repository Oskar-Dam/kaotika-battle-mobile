import * as React from 'react';
React; //Add this line to disable the unused variable error for Vercel deployment
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AttackButton from '../../components/AttackButton';
import { mockDividedPlayers } from '../../__mocks__/mockPlayers';

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
});
