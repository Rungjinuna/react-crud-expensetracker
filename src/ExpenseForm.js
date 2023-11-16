import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ addExpense, edit, setEdit }) => {
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (edit) {
      setExpense(edit.expense);
      setAmount(edit.amount);
    } else {
      setExpense('');
      setAmount('');
    }
  }, [edit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      addExpense({ id: Date.now(), expense, amount: parseFloat(amount) });
    } else {
      setEdit(null);
      addExpense({ ...edit, expense, amount: parseFloat(amount) });
    }
    setExpense('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-between mb-4'>
      <input
        type='text'
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
        placeholder='지출 항목'
        className='flex-1 mr-2 p-2 border-2 border-gray-200 rounded'
      />
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='비용 (원)'
        className='w-1/4 p-2 border-2 border-gray-200 rounded'
      />
      <button
        type='submit'
        className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        추가
      </button>
    </form>
  );
};

export default ExpenseForm;
