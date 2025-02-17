import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import BlockedScreen from '../../../components/BlockedScreen';
React;

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
});
