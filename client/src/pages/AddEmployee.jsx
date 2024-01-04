import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployeeStart, addEmployeeSuccess, addEmployeeFailure } from "../store/employeeSlice/employeeSlice.js";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BasicSelect from "../assets/mui components/selectItem.jsx";
import DatePicker from "../assets/mui components/DatePicker.jsx";
import Swal from "sweetalert2";

// firebase imports
import { app } from "../firebase/firebaseConfig.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AddEmployee() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.employee);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  // constants
  const defaultProfile = 'https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif';
  const gender = {
    id: "gender",
    data: ["MALE", "FEMALE"]
  };
  const designation = {
    id: "designation",
    data: ["Designer", "Front-end", "Back-end", "Full-stack", "Mobile-dev", "Web-dev", "Cyber-Security"]
  };

  // onChange functionality
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }; 

  // profilePicture upload functionality
  useEffect(() => {
    if(image) {
      handleImageUpload(image);
    }
  }, [image]);

  const handleImageUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      }, 
      (error) => {
        setImageError(true)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, profilePicture: downloadURL}));
      }
    );
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // addEmployee start
      dispatch(addEmployeeStart());

      // fetch to send the data from api/server
      const res = await fetch(`${import.meta.env.VITE_baseURL}/api/employee/add-employee`, {
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
      Swal.fire({
        title: "Good job!",
        text: "Successfully added an employee!",
        icon: "success"
      })
    } catch (error) {
      dispatch(addEmployeeFailure(error));
    }
  }

  return (
    <section className="flex flex-col justify-center max-w-[600px] mx-auto">
      <h1 className="text-xl self-center">Add Employee</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img 
          id="profilePicture"
          src={
            formData.profilePicture 
            ? formData.profilePicture 
            : defaultProfile
          } 
          alt="profile" 
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover my-3"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {
            imageError 
              ? <span className="text-red-700">Error uploading image(file size must be less than 2MB)</span> 
              : imagePercent > 0 && imagePercent < 100 
                ? <span className="text-slate-700">
                  {`Uploading: ${imagePercent}%`}
                </span>
                : imagePercent === 100
                  ? <span className="text-green-700">Image uploaded successfully!</span>
                  : ''
          }
        </p>
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
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
            helperText="This will be the employees default password in the portal!"
            onChange={handleChange}
          />
          <BasicSelect  item={designation} formData={formData} setFormData={setFormData} />
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount" color="success">Salary</InputLabel>
            <Input
              id="salary"
              color="success"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              onChange={handleChange}
            />
          </FormControl>
        </div>
        {
          error &&
          <p className='text-red-700 mt-5'>
            { error.message || 'Something went wrong!' }
          </p>
        }
        <Button 
          type='submit' 
          variant="outlined" 
          color="success" 
          sx={{ marginTop: '20px',  padding: '12px' }}
        >
          { loading ? 'LOADING...' : 'SUBMIT' }
        </Button>
      </form>
    </section> 
  )
}
