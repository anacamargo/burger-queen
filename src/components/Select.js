import React from 'react';

function Select(props) {
  const selectStyle = {
    width: '100%',
    fontSize: '30px',
    textTransform: 'capitalize',
    margin: '15px 0px',
    padding: '20px',
    color: '#787878',
    border: '1px solid silver',
    borderRadius: '10px'
  };

  let { options } = props;
  const defaultOption = { value: null, text: 'Selecione...' };

  return (
    <select onChange={props.onChange} style={selectStyle}>
      {[defaultOption, ...options].map((x) =>
        <option key={x.value} value={x.value}>{x.text}</option>
      )}
    </select>
  )
}

export default Select;