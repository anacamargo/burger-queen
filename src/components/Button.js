import React from 'react';

function Button(props) {
  
  const {onClick, text} = props;
  
  const buttonStyle = { 
    width: '300px', 
    fontSize: '35px', 
    textTransform: 'uppercase', 
    margin: '20px 5px 0px',
    padding: '25px 20px',
    backgroundColor: '#0066B2', 
    color: '#F1F1F1', 
    border: 'none', 
    borderRadius: '10px'
  };

  const disabledStyle = {...buttonStyle, backgroundColor : '#ccc'}

  return (
    props.disabled ? 
    <button style={disabledStyle} onClick={onClick} disabled='disabled'>{text}</button> :
    <button style={buttonStyle} onClick={onClick}>{text}</button>
  )
}

export default Button;