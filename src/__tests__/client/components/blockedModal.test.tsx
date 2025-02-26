import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'; // Importar act para simular el paso del tiempo
import * as React from 'react';
import { ONLINE_USERS_MOCK } from '../../../__mocks__/mockPlayers';
import BlockedScreen from '../../../components/BlockedScreen';
import useStore from '../../../store/useStore';
React; //Add this line to disable the unused variable error for Vercel deployment

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar advertencias
});

jest.mock('../../../sockets/socket', () => ({
  on: jest.fn(),
  emit: jest.fn(),
  off: jest.fn(),
}));

jest.mock('../../../store/useStore');

describe('LoggedDisconnectionModal Component', () => {
  it('should render the LoggedDisconnectionModal for role -ACOLYTE-', () => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      player: ONLINE_USERS_MOCK[0],
    }); 
    render(<BlockedScreen />);

    const modalComponent = screen.getByTestId('blocked-modal');
    expect(modalComponent).toBeInTheDocument();
  });
  it('should render the LoggedDisconnectionModal for role -MORTIMER-', () => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      player: ONLINE_USERS_MOCK[4], // Position of the mock player with role mortimer
    });
    render(<BlockedScreen />);

    const modalComponent = screen.getByTestId('blocked-modal');
    expect(modalComponent).toBeInTheDocument();
  });

  it('should animate dots over time', () => {
    (useStore as unknown as jest.Mock).mockReturnValue({
      player: ONLINE_USERS_MOCK[0],
    });
    render(<BlockedScreen />);

    const textElement = screen.getByText('Waiting for your turn');
    
    expect(textElement).toHaveTextContent('Waiting for your turn');
    expect(textElement).toHaveTextContent('Waiting for your turn.');
    expect(textElement).toHaveTextContent('Waiting for your turn..');
    expect(textElement).toHaveTextContent('Waiting for your turn...');
  });
});
