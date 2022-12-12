import * as React from 'react';
import Radio from '@mui/material/Radio';


export default function RadioInputs(props) {
    const [selectedValue, setSelectedValue] = React.useState('all');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            {props.labels.map(label => {
                return (
                    <div key={label.name} className='radiodisplay'>
                        <Radio
                            size='small'
                            checked={selectedValue === label.name}
                            onChange={handleChange}
                            value={label.name}
                            name="radio-buttons"
                        /><label className='radiolabel'>{label.name}</label>
                    </div>
                );
            })}

        </div>
    );
}