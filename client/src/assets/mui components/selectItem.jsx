import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ item, formData, setFormData }) {
  const [value, setValue] = useState('');
  const id = item.id;

  const handleOption = (e) => {
    setValue(e.target.value);
    setFormData({
      ...formData, [id]: e.target.value
    });
  };

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Box sx={{ minWidth: 120, flex: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" color='success'>{capitalizeFirstLetter(item.id)}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={id}
          color='success'
          value={value}
          label={id}
          onChange={handleOption}
        >
          {item.data.map((item, index) => (
            <MenuItem id={id} key={index} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}