import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployeeStart, addEmployeeSuccess, addEmployeeFailure } from "../../store/employeeSlice/employeeSlice.js";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BasicSelect from "../assets/mui components/selectItem.jsx";
import DatePicker from "../assets/mui components/DatePicker.jsx";

export default function AddEmployee() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.employee);

  const gender = {
    id: "gender",
    data: ["MALE", "FEMALE"]
  };
  const designation = {
    id: "designation",
    data: ["Designer", "Front-end", "Back-end", "Full-stack"]
  };

  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      dispatch(addEmployeeStart());
      const res = await fetch('/api/employee/add-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // add employee fail
      if(data.success === false) {
        dispatch(addEmployeeFailure(data));
        return;
      };
      // add employee success
      dispatch(addEmployeeSuccess(data));
    } catch (error) {
      dispatch(addEmployeeFailure(error));
    }
  }

  return (
    <section className="flex flex-col justify-center">
      <h1 className="text-xl self-center">Add Employee</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"
          // onChange={(e) => setImage(e.target.files[0])}
        />
        <img 
          id="profilePicture"
          src='https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif' 
          alt="profile" 
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover my-5"
          onClick={() => fileRef.current.click()}
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-5">
            <TextField 
              required
              id="firstName" 
              label="First Name" 
              variant="standard" 
              color="success"
              className="flex-1"
              onChange={handleChange}
            />
            <TextField 
              required
              id="lastName" 
              label="Last Name" 
              variant="standard" 
              color="success"
              className="flex-1"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-5">
            <DatePicker id="birthDate" formData={formData} setFormData={setFormData} />
            <BasicSelect item={gender} formData={formData} setFormData={setFormData} />
          </div>
          
          <TextField 
            required
            id="address" 
            label="Address" 
            variant="standard" 
            color="success"
            onChange={handleChange}
          />
          <TextField 
            required
            id="email" 
            type="email"
            label="Email" 
            variant="standard" 
            color="success"
            helperText="This will be the employees default email in the portal!"
            onChange={handleChange}
          />
          <TextField 
            required
            id="phoneNumber" 
            type="number"
            label="Contact Number" 
            variant="standard" 
            color="success"
            onChange={handleChange}
          />
          <TextField 
            required
            id="ID" 
            label="Company ID" 
            variant="standard" 
            color="success"
            placeholder="Enter 6 digit employees ID"
            helperText="This will be the employees default password in the portal!"
            onChange={handleChange}
          />
          <BasicSelect  item={designation} formData={formData} setFormData={setFormData} />
        </div>
        <Button 
          type='submit' 
          variant="outlined" 
          color="success" 
          sx={{ marginTop: '20px',  padding: '12px' }}
        >
          { loading ? 'LOADING' : 'SUBMIT' }
        </Button>
        <p className='text-red-700 mt-5'>
          {error ? error.message || 'Something went wrong!' : ''}
        </p>
      </form>
    </section> 
  )
}
