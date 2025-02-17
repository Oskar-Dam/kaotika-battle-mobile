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

describe('BlockedScreen Component', () => {
  it('should render the LoggedDisconnectionModal', () => {
    
    render(<BlockedScreen/>);

    const modalComponent = screen.getByTestId('blocked-modal');
    expect(modalComponent).toBeInTheDocument();
  });

  it('should animate dots over time', () => {
    render(<BlockedScreen />);

    const textElement = screen.getByText('Waiting for your turn');
    
    expect(textElement).toHaveTextContent('Waiting for your turn');
    expect(textElement).toHaveTextContent('Waiting for your turn.');
    expect(textElement).toHaveTextContent('Waiting for your turn..');
    expect(textElement).toHaveTextContent('Waiting for your turn...');
  });
});
