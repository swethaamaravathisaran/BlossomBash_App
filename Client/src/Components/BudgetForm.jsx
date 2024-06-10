import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering the required components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BudgetForm = () => {
  const [eventName, setEventName] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [allocatedFunds, setAllocatedFunds] = useState({
    flowers: 0,
    venue: 0,
    catering: 0,
    entertainment: 0,
  });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
  });
  const [allBudgets, setAllBudgets] = useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      setExpenses([...expenses, newExpense]);
      setNewExpense({
        description: '',
        amount: '',
        category: '',
      });
    } else {
      console.error('All expense fields must be filled out');
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  const handleSaveBudget = async () => {
    try {
      const budgetData = {
        eventName,
        totalBudget: parseFloat(totalBudget),
        allocatedFunds: {
          flowers: parseFloat(allocatedFunds.flowers),
          venue: parseFloat(allocatedFunds.venue),
          catering: parseFloat(allocatedFunds.catering),
          entertainment: parseFloat(allocatedFunds.entertainment),
        },
        expenses: expenses.map(expense => ({
          ...expense,
          amount: parseFloat(expense.amount),
        })),
      };

      const response = await axios.post('http://localhost:4000/budgets', budgetData);
      console.log('Budget created:', response.data);

      setEventName('');
      setTotalBudget('');
      setAllocatedFunds({
        flowers: 0,
        venue: 0,
        catering: 0,
        entertainment: 0,
      });
      setExpenses([]);
      setNewExpense({
        description: '',
        amount: '',
        category: '',
      });

      fetchBudgets();
    } catch (error) {
      console.error('Error creating budget:', error.response?.data?.error || error.message);
    }
  };

  const fetchBudgets = async () => {
    try {
      const response = await axios.get('http://localhost:4000/getallBudgets');
      setAllBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const csvReportData = allBudgets.map(budget => ({
    EventName: budget.eventName,
    TotalBudget: budget.totalBudget,
    AllocatedFunds: JSON.stringify(budget.allocatedFunds),
    Expenses: JSON.stringify(budget.expenses),
  }));

  const chartData = {
    labels: expenses.map(expense => expense.description),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map(expense => parseFloat(expense.amount)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Expenses',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        title: {
          display: true,
          text: 'Amount ($)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function(tooltipItem) {
            return `$${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black bg-opacity-50">
      <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted>
        <source src="https://assets.mixkit.co/videos/48889/48889-720.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative w-full max-w-2xl bg-white bg-opacity-70 shadow-md rounded-lg p-8 z-10">
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Create Budget</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Event Name
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Total Budget
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Allocated Funds
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Flowers
                  <input
                    type="number"
                    value={allocatedFunds.flowers}
                    onChange={(e) =>
                      setAllocatedFunds({
                        ...allocatedFunds,
                        flowers: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Venue
                  <input
                    type="number"
                    value={allocatedFunds.venue}
                    onChange={(e) =>
                      setAllocatedFunds({
                        ...allocatedFunds,
                        venue: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Catering
                  <input
                    type="number"
                    value={allocatedFunds.catering}
                    onChange={(e) =>
                      setAllocatedFunds({
                        ...allocatedFunds,
                        catering: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Entertainment
                  <input
                    type="number"
                    value={allocatedFunds.entertainment}
                    onChange={(e) =>
                      setAllocatedFunds({
                        ...allocatedFunds,
                        entertainment: e.target.value,
                      })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Add New Expense
            </label>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Description"
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, description: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, amount: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, category: e.target.value })
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddExpense}
              className="mt-4 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Expense
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Expenses
            </label>
            {expenses.length > 0 ? (
              <ul className="list-disc list-inside">
                {expenses.map((expense, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>
                      {expense.description} - ${expense.amount} ({expense.category})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteExpense(index)}
                      className="ml-2 bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">No expenses added yet.</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSaveBudget}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Budget
          </button>
        </form>
        <div className="mt-8">
          <CSVLink
            data={csvReportData}
            filename={'budgets_report.csv'}
            className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Download CSV Report
          </CSVLink>
        </div>
        {/* <div className="mt-8">
          <Bar data={chartData} options={chartOptions} />
        </div> */}
      </div>
    </div>
  );
};

export default BudgetForm;
