import React from 'react';

function Input(props) {
  const inputStyle = {
    fontSize: '35px',
    width: '66vh',
    margin: '15px 0px',
    padding: '25px 20px',
    border: '1px solid silver',
    borderRadius: '10px'
  }

  return (
    <input style={inputStyle} type={props.type} placeholder={props.text} onChange={props.onChange} value={props.value} />
  );
}

export default Input;