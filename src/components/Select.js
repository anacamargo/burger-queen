import React from 'react';

function Select(props) {
    const selectStyle = {
        fontSize: '20px',
        width: '50vh',
        margin: '10px 0px 15px',
        padding: '15px'
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