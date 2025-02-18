import * as React from 'react';
React;
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoggedDisconnectionModal from '../../../components/LoggedDisconnectionModal';
import UnloggedDisconnectionModal from '../../../components/UnloggedDisconnectionModal';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silenciar logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silenciar errores
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silenciar advertencias
});

describe('LoggedDisconnectionModal Component', () => {
  it('should render the LoggedDisconnectionModal', () => {

    render(<LoggedDisconnectionModal/>);

    const modalComponent = screen.getByTestId('logged-disconnection-modal');
    expect(modalComponent).toBeInTheDocument();
  });
});

describe('UnloggedDisconnectionModal Component', () => {
  it('should render the UnloggedDisconnectionModal', () => {

    render(<UnloggedDisconnectionModal/>);

    const modalComponent = screen.getByTestId('unlogged-disconnection-modal');
    expect(modalComponent).toBeInTheDocument();
  });
});
