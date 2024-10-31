
export const initialData = {
    name: '',
    countries: [
        { country: 'France', percentage: 50 },
        { country: 'Belgique', percentage: 20 },
        { country: 'Allemagne', percentage: 10 },
        { country: 'Inconnu', percentage: 20 }
    ]
};

// JSON Schema for data validation
export const schema = {
    type: 'object',
    properties: {
        name: { type: 'string', title: 'Nom' },
        countries: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    country: { type: 'string', title: 'Pays', enum: ['France', 'Belgique', 'Allemagne', 'Inconnu'] },
                    percentage: { type: 'integer', title: 'Pourcentage' }
                },
                required: ['country', 'percentage']
            }
        }
    },
    required: ['name', 'countries']
};

// UI Schema for form layout
export const uischema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Control',
            scope: '#/properties/name'
        },
        {
            type: 'Control',
            scope: '#/properties/countries',
            options: {
                autocomplete: true,
                add: true,
                delete: true,
                itemLabel: 'Pays',
                detail: {
                    type: 'HorizontalLayout',
                    elements: [
                        {
                            type: 'Control',
                            scope: '#/properties/country'
                        },
                        {
                            type: 'Control',
                            scope: '#/properties/percentage'
                        }
                    ]
                }
            }
        }
    ]
};
