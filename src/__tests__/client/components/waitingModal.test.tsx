import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { mockDividedPlayers } from '../../../__mocks__/mockPlayers';
import Waiting from '../../../components/Waiting';
import useStore from '../../../store/useStore';

React;

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

describe('LoggedDisconnectionModal Component', () => {
  beforeEach(() => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      player: mockDividedPlayers.kaotika[0],
      setSelectedPlayer: jest.fn(),
    });
  });
  it('should render the LoggedDisconnectionModal', () => {    
    render(<Waiting 
      setShowWaitingScreen={() => {}}
    />);

    const modalComponent = screen.getByTestId('waiting-modal');
    expect(modalComponent).toBeInTheDocument();
  }); 
});
