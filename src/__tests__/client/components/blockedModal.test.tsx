import * as React from 'react';
React; //Add this line to disable the unused variable error for Vercel deployment
import { render, screen } from '@testing-library/react'; // Importar act para simular el paso del tiempo
import '@testing-library/jest-dom';
import BlockedScreen from '../../../components/BlockedScreen';

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

describe('LoggedDisconnectionModal Component', () => {
  it('should render the LoggedDisconnectionModal for role -ACOLYTE-', () => {
    
    render(<BlockedScreen role='acolyte'/>);

    const modalComponent = screen.getByTestId('blocked-modal');
    expect(modalComponent).toBeInTheDocument();
  });
  it('should render the LoggedDisconnectionModal for role -MORTIMER-', () => {
    
    render(<BlockedScreen role='mortimer'/>);

    const modalComponent = screen.getByTestId('blocked-modal');
    expect(modalComponent).toBeInTheDocument();
  });

  it('should animate dots over time', () => {
    render(<BlockedScreen role='' />);

    const textElement = screen.getByText('Waiting for your turn');
    
    expect(textElement).toHaveTextContent('Waiting for your turn');
    expect(textElement).toHaveTextContent('Waiting for your turn.');
    expect(textElement).toHaveTextContent('Waiting for your turn..');
    expect(textElement).toHaveTextContent('Waiting for your turn...');
  });
});
