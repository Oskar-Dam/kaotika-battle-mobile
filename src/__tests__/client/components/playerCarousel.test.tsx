import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import PlayerCarousel from '../../../components/PlayerCarousel';

jest.mock('../../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
});

describe('PlayerCarousel Component', () => {
  it('should render the PlayerCarousel', () => {
    const players = mockDividedPlayers.dravokar;

    render(<PlayerCarousel
      setSelectedPlayer={() => {}}
      displayedPlayers={players}
      selectedPlayerIndex={1}
      setSelectedPlayerIndex={() => {}}
    />);

    const buttonElement = screen.getByTestId('player-carousel');
    expect(buttonElement).toBeInTheDocument();
  });
});