import React from 'react'
import {shallow} from 'enzyme'
import {EditExpensePage} from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let expense, startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(()=>{
    expense = expenses[0];
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn(() => (
        new Promise(() => {})
    ))
    history = {push: jest.fn }
    wrapper = shallow(<EditExpensePage expense={expense} startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpense} history={history}/>)
})

test('Should render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit correctly', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('Should handle onClick correctly', () => {
    wrapper.find('button').simulate('click')
    expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
});