import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Vacancies from './Vacancies';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeSavedFreelancer,
  getUserByRole,
  deleteUser,
  SaveUser,
  getSavedUsers
} from '../../store/Slices/userSlicer';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('../../store/Slices/userSlicer', () => ({
  removeSavedFreelancer: jest.fn((id) => ({ type: 'removeSavedFreelancer', payload: id })),
  getUserByRole: jest.fn(() => ({ type: 'getUserByRole' })),
  deleteUser: jest.fn((id) => ({ type: 'deleteUser', payload: id })),
  SaveUser: jest.fn((id) => ({ type: 'SaveUser', payload: id })),
  getSavedUsers: jest.fn(() => ({ type: 'getSavedUsers' }))
}));

// Мокаем сложные компоненты
jest.mock('../../materialuiComponents/Button', () => (props) => (
  <button>{props.text}</button>
));

jest.mock(
  '../../materialuiComponents/ModalFreelancerDetails/ModalFreelancerDetails',
  () => ({ candidate }) => <div>Modal for {candidate.login}</div>
);

describe('Vacancies component', () => {
  const mockDispatch = jest.fn();

  const mockCandidate = {
    idUser: 1,
    login: 'JohnDoe',
    createdAt: '2024-01-15T00:00:00.000Z',
    UserInformation: {
      location: 'New York',
      salary: 5000,
      description: 'Experienced frontend developer with React skills'
    }
  };

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('dispatches getUserByRole and getSavedUsers on mount', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: {
          users: [],
          savedUsers: [],
          status: 'succeeded'
        }
      })
    );

    render(<Vacancies />);

    expect(mockDispatch).toHaveBeenCalledWith(
      getUserByRole({ role: 'freelancer' })
    );
    expect(mockDispatch).toHaveBeenCalledWith(getSavedUsers());
  });

  test('renders loading state', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: {
          users: [],
          savedUsers: [],
          status: 'loading'
        }
      })
    );

    render(<Vacancies />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders candidate data correctly', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: {
          users: [mockCandidate],
          savedUsers: [],
          status: 'succeeded'
        }
      })
    );

    render(<Vacancies />);

    expect(screen.getByText('JohnDoe')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('$5000/Month')).toBeInTheDocument();
    expect(screen.getByText(/Experienced frontend developer/)).toBeInTheDocument();
  });

  test('adds candidate to favorites if not already saved', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: {
          users: [mockCandidate],
          savedUsers: [],
          status: 'succeeded'
        }
      })
    );

    render(<Vacancies />);

    const favButton = screen.getByLabelText('add to favorites');
    fireEvent.click(favButton);

    expect(SaveUser).toHaveBeenCalledWith(1);
  });

  test('removes candidate from favorites if already saved', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: {
          users: [mockCandidate],
          savedUsers: [{ idUser: 1 }],
          status: 'succeeded'
        }
      })
    );

    render(<Vacancies />);

    const favButton = screen.getByLabelText('add to favorites');
    fireEvent.click(favButton);

    expect(removeSavedFreelancer).toHaveBeenCalledWith(1);
    expect(deleteUser).toHaveBeenCalledWith(1);
  });

  test('shows red favorite icon if saved', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        users: {
          users: [mockCandidate],
          savedUsers: [{ idUser: 1 }],
          status: 'succeeded'
        }
      })
    );

    render(<Vacancies />);

    const favButton = screen.getByLabelText('add to favorites');
    expect(favButton.querySelector('svg')).toBeInTheDocument();
  });
});
