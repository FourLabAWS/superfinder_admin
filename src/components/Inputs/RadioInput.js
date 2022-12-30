import * as React from 'react';
import Radio from '@mui/material/Radio';
import './styles.css'

export default function RadioInputs(props) {
    const [selectedValue, setSelectedValue] = React.useState('all');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        props.func(event.target.value);
    };

    return (
        <div>
            {props.labels.map(label => {
                return (
                    <div key={label.id} className='radiodisplay'>
                        <Radio
                            size='small'
                            checked={selectedValue === label.value}
                            onChange={handleChange}
                            value={label.value}
                            name="radio-buttons"
                        /><label className='radiolabel'>{label.label}</label>
                    </div>
                );
            })}

        </div>
    );
}