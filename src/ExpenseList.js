import ExpenseItem from './ExpenseItem';

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
