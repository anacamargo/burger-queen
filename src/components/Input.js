import React from 'react';

function Input(props) {
  const inputStyle = {
    fontSize: '20px',
    width: '50vh',
    margin: '10px 0px 15px',
    padding: '15px'
  }

  return (
    <input style={inputStyle} type={props.type} placeholder={props.text} onChange={props.onChange} value={props.value} />
  );
}

export default Input;