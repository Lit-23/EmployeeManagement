import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function BasicDatePicker({ id, formData, setFormData }) {
  const [value, setValue] = React.useState(null);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [id]: e.target.value })
  //   console.log(e.target.input.value);
  // };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer sx={{ marginTop: -1 }} components={['DatePicker']}>
        <DatePicker 
          label="Birthdate" 
          value={value} 
          onChange={(newValue) => {
            setValue(newValue);
            setFormData({ ...formData, [id]: newValue});
          }} 
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}