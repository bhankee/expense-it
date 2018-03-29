import React from 'react';

const EditExpensePage = props => {
  console.log(props);
  return (
    <div>
      <h1>expense with id of {props.match.params.id} </h1>
    </div>
  );
};
export default EditExpensePage;
