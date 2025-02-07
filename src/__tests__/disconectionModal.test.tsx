import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoggedDisconnectionModal from '../components/LoggedDisconnectionModal';
import { mockDividedPlayers } from '../__mocks__/mockPlayers';
import UnloggedDisconnectionModal from '../components/UnloggedDisconnectionModal';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar advertencias
});

describe('LoggedDisconnectionModal Component', () => {
  it('should render the LoggedDisconnectionModal', () => {
    const player = mockDividedPlayers.kaotika[0];
    
    render(<LoggedDisconnectionModal
      setPlayer={() => player}
      setIsLoggedIn={() => true}
      setEmail={() => player.email}
    />);

    const modalComponent = screen.getByTestId('logged-disconnection-modal');
    expect(modalComponent).toBeInTheDocument();
  });
});

describe('UnloggedDisconnectionModal Component', () => {
  it('should render the UnloggedDisconnectionModal', () => {

    render(<UnloggedDisconnectionModal
    />);

    const modalComponent = screen.getByTestId('unlogged-disconnection-modal');
    expect(modalComponent).toBeInTheDocument();
  });
});
