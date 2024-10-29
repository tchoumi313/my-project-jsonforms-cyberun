// CountryAutocomplete.tsx
import { ControlProps, isStringControl, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Autocomplete, TextField } from '@mui/material';

const countries = ['France', 'Belgium', 'Germany', 'Unknown'];

const CountryAutocomplete = (props: ControlProps) => {
    const { data, handleChange, path } = props;

    return (
        <Autocomplete
            options={countries}
            value={data || ''}
            onChange={(event, newValue) => handleChange(path, newValue)}
            renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
        />
    );
};

export const tester = rankWith(
    6, // Rank for determining priority; adjust if necessary
    isStringControl // Tester function for string controls
);

export default withJsonFormsControlProps(CountryAutocomplete);
