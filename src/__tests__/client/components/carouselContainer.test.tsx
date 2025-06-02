React;
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CarouselContainer from '../../../components/CarouselContainer';
import useStore from '../../../store/useStore';

jest.mock('../../../store/useStore');

describe('CarouselContainer component rendering', () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      kaotikaPlayers: [],
      dravokarPlayers: [],
      player: { _id: '0', isBetrayer: false },
      setSelectedPlayer: jest.fn(),
      setSelectedPlayerIndex: jest.fn(),
      selectedPlayerIndex: 0,
      isMyTurn: false,
    });
  });

  it('should render when mounted', () => {
    render(<CarouselContainer
      filteredFaction={undefined}
      setFilteredFaction={() => {}}
    />);

    expect(screen.getByTestId('carousel-container')).toBeInTheDocument();
  });
});
