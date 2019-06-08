import React from 'react';
import { transform } from '@babel/core';

function Select(props) {
    const selectStyle = {
        textTransform: 'capitalize',
        fontSize: '35px',
        color: '#787878', 
        width: '70vh',
        margin: '15px 0px',
        padding: '25px 20px',
        border: '1px solid silver',
        borderRadius: '10px'
    };

    let {options} = props;
    const defaultOption = {value : null, text : 'Selecione...'};

    return (
        <select onChange={props.onChange} style={selectStyle}>
            {[defaultOption, ...options].map((x) =>
                <option key={x.value} value={x.value}>{x.text}</option>
            )}
        </select>
    )
}

export default Select;