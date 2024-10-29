import { ControlProps, isNumberControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { TextField } from '@mui/material';
import React from 'react';

const CustomPercentageControl = (props: ControlProps) => {
    const { data, handleChange, path, uischema, errors } = props;

    const handlePercentageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value) && value >= 0 && value <= 100) {
            handleChange(path, value);
        }
    };

    return (
        <>
            <TextField
                label="Percentage"
                type="number"
                value={data || ''}
                onChange={handlePercentageChange}
                helperText={errors}
                error={!!errors}
                inputProps={{ min: 0, max: 100 }}
            />


        </>

    );
};

export default withJsonFormsControlProps(CustomPercentageControl);

export const tester = rankWith(
    2, // Adjust the rank as needed
    isNumberControl
);
