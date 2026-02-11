import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCart from './UserCart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInf } from '../../store/Slices/userSlicer';
import { createAdditionalService } from '../../store/Slices/additionalServicesSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

// мокаем actions
jest.mock('../../store/Slices/userSlicer', () => ({
  fetchInf: jest.fn(() => ({ type: 'fetchInf' }))
}));

jest.mock('../../store/Slices/additionalServicesSlice', () => ({
  createAdditionalService: jest.fn((data) => ({
    type: 'createAdditionalService',
    payload: data
  }))
}));

// мокаем UI компоненты
jest.mock('../../materialuiComponents/Button', () => (props) => (
  <button>{props.text}</button>
));

jest.mock('../../materialuiComponents/ModalUpdInf/ModalUpdInf', () => () => (
  <div>Update Modal</div>
));

jest.mock('../../materialuiComponents/ModalAddServices/ModalAddServices', () => ({ onCreateService }) => (
  <button onClick={() => onCreateService({
    serviceName: 'Test',
    description: 'Desc',
    price: 100
  })}>
    Open Add Service Modal
  </button>
));

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => <div>{children}</div>
}));

describe('UserCart component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        user: {
          login: 'John',
          email: 'john@mail.com',
          role: 'freelancer',
          createdAt: '2024-01-01'
        }
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('dispatches fetchInf on mount', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: { status: 'succeeded', inf: {} }
      })
    );

    render(<UserCart />);
    expect(fetchInf).toHaveBeenCalled();
  });

  test('renders loading state', () => {
    useSelector.mockImplementation((selector) =>
      selector({ users: { status: 'loading', inf: {} } })
    );

    render(<UserCart />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders user info', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: {
          status: 'succeeded',
          inf: { salary: 3000, location: 'USA', description: 'Hello' }
        }
      })
    );

    render(<UserCart />);

    expect(screen.getByText(/John/)).toBeInTheDocument();
    expect(screen.getByText(/john@mail.com/)).toBeInTheDocument();
    expect(screen.getByText(/3000/)).toBeInTheDocument();
  });

  test('creates additional service when modal triggers', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: { status: 'succeeded', inf: {} }
      })
    );

    render(<UserCart />);

    fireEvent.click(screen.getByText('Open Add Service Modal'));

    expect(createAdditionalService).toHaveBeenCalledWith({
      serviceName: 'Test',
      description: 'Desc',
      price: 100
    });
  });

  test('shows admin button for admin role', () => {
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        user: { login: 'Admin', email: 'admin@mail.com', role: 'admin', createdAt: '2024-01-01' }
      })
    );

    useSelector.mockImplementation((selector) =>
      selector({ users: { status: 'succeeded', inf: {} } })
    );

    render(<UserCart />);
    expect(screen.getByText('View Users')).toBeInTheDocument();
  });
});
