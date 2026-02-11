import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

// 1. Импортируем ВСЁ из слайса как объект для мока thunk-селекторов
import * as userActions from '../../store/Slices/userSlicer';
import usersReducer from '../../store/Slices/userSlicer';
import finesReducer from '../../store/Slices/fineSlice';
import UserList from './AllUsers';

// Подавляем ошибку депрекации act (React 18)
global.IS_REACT_ACT_ENVIRONMENT = true;

describe('UserList Component', () => {
    // Настройка чистого стора для каждого теста
    const setupStore = (preloadedState) => configureStore({
        reducer: {
            users: usersReducer,
            fines: finesReducer
        },
        preloadedState,
        // Отключаем проверку сериализуемости для тестов, чтобы не было лишних варнингов
        middleware: (getDefault) => getDefault({ serializableCheck: false }),
    });

    const renderWithProviders = (ui, { preloadedState = {} } = {}) => {
        return render(
            <Provider store={setupStore(preloadedState)}>
                <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    {ui}
                </MemoryRouter>
            </Provider>
        );
    };

    beforeEach(() => {
        // 2. ГАРАНТИРУЕМ, что fetchUsers возвращает валидную Thunk-функцию
        jest.spyOn(userActions, 'fetchUsers').mockImplementation(() => {
            return (dispatch) => Promise.resolve({ payload: [] });
        });

        localStorage.clear();
        localStorage.setItem('currentUser', JSON.stringify({ user: { role: 'admin' } }));
    });

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks(); // Очищаем шпионов
    });

    test('renders without crashing and shows users', async () => {
        const initialState = {
            users: {
                users: {
                    data: [
                        { idUser: '1', login: 'TestUser', email: 'test@test.com', isBlocked: false, role: 'user' }
                    ]
                },
                status: 'resolved',
                error: null
            }
        };

        renderWithProviders(<UserList />, { preloadedState: initialState });

        // Используем findBy, так как фильтрация в useEffect может занять тик
        const userLogin = await screen.findByText('TestUser');
        expect(userLogin).toBeInTheDocument();
    });

    test('shows loading spinner when status is loading', () => {
        const loadingState = {
            users: {
                users: { data: [] },
                status: 'loading',
                error: null
            }
        };

        const { container } = renderWithProviders(<UserList />, { preloadedState: loadingState });
        
        // Поиск спиннера по классу Tailwind
        const spinner = container.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
    });
});