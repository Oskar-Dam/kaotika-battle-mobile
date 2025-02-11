import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlockedScreen from '../../../components/BlockedScreen';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar advertencias
});

describe('LoggedDisconnectionModal Component', () => {
  it('should render the LoggedDisconnectionModal', () => {
    
    render(<BlockedScreen/>);

    const modalComponent = screen.getByTestId('blocked-modal');
    expect(modalComponent).toBeInTheDocument();
  });
});
