import React from 'react';
import './ExpenseList.css'; // Ensure you have imported the CSS file for styling

// Function to group expenses by month and year
const groupByMonth = (expenses) => {
  return expenses.reduce((groups, expense) => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(expense);

    return groups;
  }, {});
};

// Helper function to format the month and year
const formatMonthYear = (monthYear) => {
  const [year, month] = monthYear.split('-');
  return new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
};

const ExpenseList = ({ expenses }) => {
  const groupedExpenses = groupByMonth(expenses);

  return (
    <div className="expense-container">
      <h3>Expense History</h3>
      {Object.keys(groupedExpenses).map((monthYear) => (
        <div key={monthYear}>
          <h4>{formatMonthYear(monthYear)}</h4>
          <ul>
            {groupedExpenses[monthYear].map((expense) => (
              <li key={expense._id}>
                ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
