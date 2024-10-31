import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { Typography } from '@mui/material';
import React, { useState } from 'react';
import PercentageControl, { percentageControlTester } from './components/p';
import { initialData, schema, uischema } from './config';
const App: React.FC = () => {
  const [formData, setFormData] = useState(initialData);

  const handleDataChange = ({ data }: any) => {
    setFormData(data);
  };

  return (
    <div style={{ padding: '20px', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Challenge Form
      </Typography>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={formData}
        renderers={[
          ...materialRenderers,
          {
            tester: percentageControlTester,
            renderer: (props) => <PercentageControl {...props} fullData={formData} />
          }
        ]}
        cells={materialCells}
        onChange={handleDataChange}
      />
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default App;