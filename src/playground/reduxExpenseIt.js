import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

/*-----------------------
  ADD EXPENSE ACTION GEN
------------------------*/
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

/*-----------------------
REMOVE EXPENSE ACTION GEN
------------------------*/
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

/*-----------------------
EDIT EXPENSE ACTION GEN
------------------------*/
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

/*-----------------------
TEXT FILTER ACTION GEN
------------------------*/
const setTextFilter = (text = '') => ({
  type: 'TEXT_FILTER',
  text
});

/*-----------------------
 SORTBYAMOUNT ACTION GEN
------------------------*/
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

/*-----------------------
  SORTBYDATE ACTION GEN
------------------------*/
const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

/*-----------------------
 SETSTARTDATE ACTION GEN
------------------------*/
const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
});

/*-----------------------
  SETENDDATE ACTION GEN
------------------------*/
const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate
});

/*-----------------------
    EXPENSES REDUCER
------------------------*/
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      // like state.concat(action.expense)
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      // like state.concat(action.expense)
      return state.map(expense => {
        if (expense.id === action.id) {
          // take in old values and override with new with ...expense, ...action.updates
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });

    default:
      return state;
  }
};

/*-----------------------
    FILTERS REDUCER
------------------------*/
const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

/*-----------------------
  GET VISIBLE EXPENSES
------------------------*/
// text:state.filters.text...
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== 'number' || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== 'number' || expense.createdAt <= endDate;
      const textMatch = expense.description
        .toLowerCase()
        .includes(text.toLowerCase());

      // If all are true Filter will be true and item stays in array
      // If any are false remove from array
      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

/*-----------------------
    STORE CREATION
------------------------*/
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

/*-----------------------
    STORE DISPATCHES
------------------------*/

// DISPATCH ADD
const expenseOne = store.dispatch(
  addExpense({ description: 'Rent', amount: 100, createdAt: 1000 })
);
const expensetwo = store.dispatch(
  addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 })
);
// // DISPATCH REMOVE
// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// // DISPATCH EDIT
// store.dispatch(editExpense(expensetwo.expense.id, { amount: 500 }));

// // DISPATCH TEXT FILTER
// store.dispatch(setTextFilter('ffe'));

// DISPATCH SORTBYAMOUNT FILTER
store.dispatch(sortByAmount());

// // DISPATCH SORTBYDATE FILTER
// store.dispatch(sortByDate());

// //DISPATCH SORTBYDATE FILTER
// store.dispatch(setStartDate(125));

// // DISPATCH SORTBYDATE FILTER
// store.dispatch(setEndDate(1250));

const demo = {
  expenses: [
    {
      id: 'dkjfakljdasl',
      description: 'January Rent',
      note: 'Final Payment',
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
};
