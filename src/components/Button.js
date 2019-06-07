import React from 'react';

function Button(props) {
  
  const {onClick, text} = props;
  
  const buttonStyle = { 
    width: '220px', 
    height: '50px', 
    fontSize: '20px', 
    textTransform: 'uppercase', 
    textAlign: 'center', 
    margin: '20px 5px 0px', 
    backgroundColor: '#C64706', 
    color: '#C1C1C1', 
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