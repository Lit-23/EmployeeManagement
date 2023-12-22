import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue) {
      navigate(`${event.target.name}`);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        {/*  sx={{ borderBottom: 1, borderColor: 'divider' }} */}
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab name='/' label="Home" {...a11yProps(0)} />
          <Tab name='/about' label="About" {...a11yProps(1)} />
          <Tab name='/employee-login' label="Employee Login" {...a11yProps(2)} />
          <Tab name='/admin-login' label="Admin Login" {...a11yProps(3)} />
        </Tabs>
      </Box>
      {/* <CustomTabPanel value={value} index={0}>
        Home
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        About
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Employee Login
      </CustomTabPanel> */}
    </Box>
  );
}