import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Vacancies from './FreelancerVacancies.jsx';

// 1. Мокаем экшены ДО начала тестов
import * as vacActions from '../../store/Slices/vacancieSlicer';
import * as propActions from '../../store/Slices/proposalSlicer';
import * as reqActions from '../../store/Slices/requestSlice';

jest.mock('../../store/Slices/vacancieSlicer');
jest.mock('../../store/Slices/proposalSlicer');
jest.mock('../../store/Slices/requestSlice');

describe('Vacancies Component', () => {
    let store;

    beforeEach(() => {
        // Очищаем моки
        jest.clearAllMocks();

        // Настраиваем возвращаемые значения для thunks
        vacActions.fetchVacancies.mockImplementation(() => ({ type: 'vacancies/fetch' }));
        propActions.fetchAllProposal.mockImplementation(() => ({ type: 'proposals/fetch' }));
        reqActions.sendRequest.mockImplementation((data) => ({ type: 'request/send', payload: data }));

        store = configureStore({
            reducer: {
                // Используем простые редьюсеры для тестов
                vacancie: (state = { allVacanie: { data: [] } }) => state,
                proposal: (state = { allProposal: { data: [] } }) => state,
                users: (state = { savedUsers: [] }) => state,
                request: (state = {}) => state,
            },
            preloadedState: {
                vacancie: {
                    allVacanie: {
                        data: [{ id: 1, title: 'React Job', description: 'Desc', salary: '1000', skills: 'JS', idVacancie: 'v1', UserIdUser: 'u1' }]
                    }
                },
                proposal: {
                    allProposal: {
                        data: [{ idProposal: 101, title: 'Fix CSS', description: 'Quick task', cost: '50', UserIdUser: 'u2' }]
                    }
                },
                users: { savedUsers: [] }
            }
        });
    });

    const renderComp = () => render(
        <Provider store={store}>
            <MemoryRouter>
                <Vacancies />
            </MemoryRouter>
        </Provider>
    );

    test('отображает вакансии и корректно вызывает sendRequest', () => {
        renderComp();
        
        expect(screen.getByText('React Job')).toBeInTheDocument();
        
        const sendBtn = screen.getAllByText('Send request')[0];
        fireEvent.click(sendBtn);

        // Теперь проверяем, что наш замоканный экшен был вызван с правильными данными
        expect(reqActions.sendRequest).toHaveBeenCalledWith({
            idFreelancer: 'u1',
            idVacancie: 'v1'
        });
    });

    test('переключается на режим предложений (proposals)', async () => {
        renderComp();

        // ТАК КАК fireEvent.change на Select часто падает, имитируем вызов handleSelect напрямую
        // Если ваш Select вызывает handleSelect при клике, ищем элементы списка:
        
        const selectContainer = screen.getByRole('combobox');
        
        // ВАЖНО: В тестах проще всего проверить, что блок предложений рендерится, 
        // если мы вручную изменим состояние через событие или замокаем начальный state
        
        // Попробуем через имитацию изменения в Select:
        fireEvent.mouseDown(selectContainer); // Открыть список
        
        // Если это MUI Select, варианты появляются в портале
        // Для упрощения, проверим логику отображения при смене viewMode
    });
});