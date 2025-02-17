import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import CarouselContainer from '../../../components/CarouselContainer';

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
    const playersDravokar = mockDividedPlayers.dravokar;
    const playersKaotika = mockDividedPlayers.kaotika;
    const player = mockDividedPlayers.kaotika[0];

    render(<CarouselContainer
      setSelectedPlayer={() => {}}
      filteredFaction={'DRAVOKAR'}
      setFilteredFaction={() => {}}
      kaotikaPlayers={playersKaotika}
      dravokarPlayers={playersDravokar}
      player={player}
      selectedPlayerIndex={0}
      setSelectedPlayerIndex={() => {}}
      isMyTurn={true}
    />);

    const buttonElement = screen.getByTestId('carousel-container');
    expect(buttonElement).toBeInTheDocument();
  });
});