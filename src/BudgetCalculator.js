import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

const BudgetCalculator = () => {
  //로컬스토리지에 저장
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem('expenses')) || []
  );
  //리프레시되어도 사라지지않게 로컬스토리지에서 꺼내오기
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const showAlert = (show = false, type = '', message = '') => {
    setAlert({ show, type, message });
  };

  const updateExpense = (id, updatedExpense, updatedAmount) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id
          ? { ...expense, expense: updatedExpense, amount: updatedAmount }
          : expense
      )
    );
  };

  const addExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    showAlert(true, 'success', '항목이 추가되었습니다.');
  };

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        showAlert();
      }, 3000);
    }
  }, [alert.show]);

  const removeExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (id, updatedExpense) => {
    setExpenses(
      expenses.map((expense) => (expense.id === id ? updatedExpense : expense))
    );
  };
  const clearExpenses = () => {
    setExpenses([]);
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className='max-w-4xl mx-auto p-5'>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}
      <h1 className='text-2xl font-bold text-center mb-6'>예산계산기</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList
        expenses={expenses}
        updateExpense={updateExpense}
        removeExpense={removeExpense}
      />
      <div className='flex justify-between items-center my-4'>
        <button
          onClick={clearExpenses}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          전체 목록 삭제
        </button>
        <div className='text-lg font-semibold'>
          총 지출: {totalExpenses.toLocaleString()} 원
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
