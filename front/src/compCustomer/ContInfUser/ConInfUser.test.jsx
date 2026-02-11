import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConInfUser from './ConInfUser';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAdditionalServicesByIds,
  deleteAdditionalService,
  removeService
} from '../../store/Slices/additionalServicesSlice';
import { fetchProposalbyId } from '../../store/Slices/proposalSlicer';
import { fetchAllUserRequests } from '../../store/Slices/requestSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

// мокаем actions
jest.mock('../../store/Slices/additionalServicesSlice', () => ({
  fetchAdditionalServicesByIds: jest.fn((id) => ({ type: 'fetchServices', payload: id })),
  deleteAdditionalService: jest.fn((id) => ({ type: 'deleteService', payload: id })),
  removeService: jest.fn((id) => ({ type: 'removeService', payload: id }))
}));

jest.mock('../../store/Slices/proposalSlicer', () => ({
  fetchProposalbyId: jest.fn(() => ({ type: 'fetchProposal' }))
}));

jest.mock('../../store/Slices/requestSlice', () => ({
  fetchAllUserRequests: jest.fn((id) => ({ type: 'fetchRequests', payload: id }))
}));

// мокаем UI
jest.mock('../../materialuiComponents/Button', () => (props) => (
  <button onClick={props.func}>{props.text}</button>
));

jest.mock('../SavedFreelancers/SavedFreelancers', () => () => (
  <div>SavedFreelancers</div>
));

jest.mock('react-router-dom', () => ({
  Link: ({ children }) => <div>{children}</div>
}));

describe('ConInfUser component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);

    localStorage.setItem(
      'currentUser',
      JSON.stringify({ user: { id: 1, role: 'freelancer' } })
    );
  });

  afterEach(() => jest.clearAllMocks());

  test('dispatches fetch actions on mount', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        proposal: { proposal: [], status: 'succeeded' },
        additionalServices: { addService: [], statusService: 'succeeded' },
        request: { request: [], statusReq: 'succeeded' }
      })
    );

    render(<ConInfUser />);

    expect(fetchProposalbyId).toHaveBeenCalled();
    expect(fetchAdditionalServicesByIds).toHaveBeenCalledWith(1);
    expect(fetchAllUserRequests).toHaveBeenCalledWith(1);
  });

  test('renders loading state', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        proposal: { proposal: [], status: 'loading' },
        additionalServices: { addService: [], statusService: 'succeeded' },
        request: { request: [], statusReq: 'succeeded' }
      })
    );

    render(<ConInfUser />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  test('renders services', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        proposal: { proposal: [], status: 'succeeded' },
        additionalServices: {
          statusService: 'succeeded',
          addService: [
            { serviceId: 1, serviceName: 'Logo', description: 'Design', price: 50 }
          ]
        },
        request: { request: [], statusReq: 'succeeded' }
      })
    );

    render(<ConInfUser />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  test('deletes service', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        proposal: { proposal: [], status: 'succeeded' },
        additionalServices: {
          statusService: 'succeeded',
          addService: [
            { serviceId: 1, serviceName: 'Logo', description: 'Design', price: 50 }
          ]
        },
        request: { request: [], statusReq: 'succeeded' }
      })
    );

    render(<ConInfUser />);
    fireEvent.click(screen.getByText('DELETE'));

    expect(removeService).toHaveBeenCalledWith(1);
    expect(deleteAdditionalService).toHaveBeenCalledWith({ serviceId: 1 });
  });

  test('renders requests', () => {
    useSelector.mockImplementation((selector) =>
      selector({
        proposal: { proposal: [], status: 'succeeded' },
        additionalServices: { addService: [], statusService: 'succeeded' },
        request: {
          statusReq: 'succeeded',
          request: [{ serviceId: 1, serviceName: 'Fix bug', description: 'React', price: 20 }]
        }
      })
    );

    render(<ConInfUser />);
    expect(screen.getByText('Fix bug')).toBeInTheDocument();
  });
});
