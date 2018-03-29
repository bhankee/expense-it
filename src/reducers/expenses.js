/*-----------------------
    EXPENSES REDUCER
------------------------*/
const expensesReducerDefaultState = [];
export default (state = expensesReducerDefaultState, action) => {
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
