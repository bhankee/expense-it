/*-----------------------
TEXT FILTER ACTION GEN
------------------------*/
export const setTextFilter = (text = '') => ({
  type: 'TEXT_FILTER',
  text
});

/*-----------------------
   SORTBYAMOUNT ACTION GEN
  ------------------------*/
export const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT'
});

/*-----------------------
    SORTBYDATE ACTION GEN
  ------------------------*/
export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

/*-----------------------
   SETSTARTDATE ACTION GEN
  ------------------------*/
export const setStartDate = startDate => ({
  type: 'SET_START_DATE',
  startDate
});

/*-----------------------
    SETENDDATE ACTION GEN
  ------------------------*/
export const setEndDate = endDate => ({
  type: 'SET_END_DATE',
  endDate
});
