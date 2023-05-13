import { createSlice } from '@reduxjs/toolkit';
import { Employee, employeesApi } from '../../store/services/employees';
import { RootState } from '../../store/store';

interface InitialState {
    employees: Employee[] | null;
}

const initialState: InitialState = {
    employees: null
}

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        //Обнуляем работников при выходе из аккаунта
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(employeesApi.endpoints.getAllEmployees.matchFulfilled, (state, action) => {
                state.employees = action.payload;
            })
    }
});

export default employeesSlice.reducer;

export const selectEmployees = (state: RootState) => state.employeesSlice;