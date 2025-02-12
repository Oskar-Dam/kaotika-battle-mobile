import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Waiting from '../../../components/Waiting';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';

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

describe('LoggedDisconnectionModal Component', () => {
  it('should render the LoggedDisconnectionModal', () => {
    const player = mockDividedPlayers.kaotika[0];
    
    render(<Waiting 
      role={player.role}
      setDravocarPlayers={() => {}}
      setKaotikaPlayers={() => {}}
      setShowWaitingScreen={() => {}}
    />);

    const modalComponent = screen.getByTestId('waiting-modal');
    expect(modalComponent).toBeInTheDocument();
  });
});
