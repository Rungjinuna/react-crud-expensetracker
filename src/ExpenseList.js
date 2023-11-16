import React, { useState } from 'react';

const ExpenseItem = ({ expense, handleUpdate, handleRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState(expense.expense);
  const [editedAmount, setEditedAmount] = useState(expense.amount);

  const handleEdit = () => {
    if (isEditing) {
      handleUpdate(expense.id, editedExpense, editedAmount);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className='flex justify-between items-center bg-white p-3 shadow-md rounded mb-2'>
      {isEditing ? (
        <>
          <input
            type='text'
            value={editedExpense}
            onChange={(e) => setEditedExpense(e.target.value)}
            className='flex-1 mr-2 p-2 border-2 border-gray-200 rounded'
          />
          <input
            type='number'
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            className='w-1/4 p-2 border-2 border-gray-200 rounded'
          />
        </>
      ) : (
        <>
          <span className='flex-1'>{expense.expense}</span>
          <span className='w-1/4 text-right'>
            {expense.amount.toLocaleString()} 원
          </span>
        </>
      )}
      <button
        onClick={handleEdit}
        className='ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded'
      >
        {isEditing ? '저장' : '수정'}
      </button>
      <button
        onClick={() => handleRemove(expense.id)}
        className='ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded'
      >
        삭제
      </button>
    </div>
  );
};

const ExpenseList = ({ expenses, updateExpense, removeExpense }) => {
  return (
    <div className='mb-4'>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          handleUpdate={updateExpense}
          handleRemove={removeExpense}
        />
      ))}
    </div>
  );
};

export default ExpenseList;
