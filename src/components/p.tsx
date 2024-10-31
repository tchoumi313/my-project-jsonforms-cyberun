import { ControlProps, RankedTester, rankWith, scopeEndsWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface PercentageControlProps extends ControlProps {
    fullData: any; // Add a prop for the full form data
}

const PercentageControl = ({ data, handleChange, path, fullData }: PercentageControlProps) => {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (fullData && Array.isArray(fullData.countries)) {
            const totalPercentage = fullData.countries.reduce((sum, row) => sum + (row.percentage || 0), 0);
            setError(totalPercentage !== 100 ? "Le total des pourcentages doit être égal à 100%." : null);
        }
    }, [fullData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        handleChange(path, isNaN(value) ? undefined : value);
    };

    return (
        <div>
            <TextField
                type="number"
                value={data || ''}
                onChange={handleInputChange}
                label="Pourcentage"
                error={!!error}
                helperText={error}
                InputProps={{ inputProps: { min: 0, max: 100 } }}
            />
        </div>
    );
};

export default withJsonFormsControlProps(PercentageControl);

export const percentageControlTester: RankedTester = rankWith(
    3, // Adjust the rank as needed
    scopeEndsWith('percentage')
);