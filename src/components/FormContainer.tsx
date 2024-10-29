import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useEffect, useState } from 'react';
import CountryAutocomplete, { tester as CountryAutocompleteTester } from './CountryAutocomplete'; // Import CountryAutocomplete
import CustomPercentageControl, { tester as CustomPercentageControlTester } from './CustomPercentageControl';

const schema = {
    type: 'object',
    properties: {
        "name": { type: 'string', title: 'Name' },

        distribution: {
            type: 'array',
            title: 'Country Distribution',
            items: {
                type: 'object',
                properties: {
                    country: { type: 'string', title: 'Country', oneOf: [{ enum: ['France', 'Belgium', 'Germany', 'Unknown'] }] },
                    percentage: { type: 'number', title: 'Percentage' }
                }
            }
        }
    }
};
const uischema = {
    type: 'VerticalLayout',
    elements: [
        { type: 'Control', scope: '#/properties/name' },
        {
            type: 'Control',
            scope: '#/properties/distribution',
            options: { elementLabelProp: 'country' }
        }
    ]
};
/*
const uischema = {
    type: 'VerticalLayout',
    elements: [
        { type: 'Control', scope: '#/properties/name' },
        {
            type: 'Control',
            scope: '#/properties/distribution',
            options: {
                detail: {
                    type: 'VerticalLayout',
                    elements: [
                        { type: 'Control', scope: '#/properties/country', options: { autocomplete: true } },
                        { type: 'Control', scope: '#/properties/percentage' }
                    ]
                }
            }
        }
    ]
};*/

const FormContainer = () => {
    const [data, setData] = useState({ distribution: [{ country: '', percentage: 0 }] });
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState({ name: '' });

    const handleAddRow = () => {
        setData((prevData) => ({
            ...prevData,
            distribution: [...prevData.distribution, { country: '', percentage: 0 }]
        }));
    };

    const handleDeleteRow = (index: number) => {
        setData((prevData) => {
            const newDistribution = [...prevData.distribution];
            newDistribution.splice(index, 1);
            return { ...prevData, distribution: newDistribution };
        });
    };

    useEffect(() => {
        const totalPercentage = data.distribution.reduce((sum, row) => sum + (row.percentage || 0), 0);
        setError(totalPercentage !== 100 ? "Total percentage must equal 100%" : null);
    }, [data]);

    return (
        <div>
            {/* Name Input */}
            <JsonForms
                schema={{ type: 'object', properties: { name: schema.properties.name } }}
                uischema={{ type: 'Control', scope: '#/properties/name' }}
                data={name}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({ data }) => setName(data)}
            />

            {/* Distribution Table */}
            <JsonForms
                schema={{ type: 'object', properties: { distribution: schema.properties.distribution } }}
                uischema={{ type: 'Control', scope: '#/properties/distribution' }}
                data={data}
                renderers={[
                    ...materialRenderers,
                    { tester: CountryAutocompleteTester, renderer: CountryAutocomplete },
                    { tester: CustomPercentageControlTester, renderer: CustomPercentageControl }
                ]}
                cells={materialCells}
                onChange={({ data }) => setData(data)}
            />

            {/* Add Row Button */}
            <button onClick={handleAddRow}>+</button>

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default FormContainer;
