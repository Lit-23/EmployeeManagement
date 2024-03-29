import { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from "react-redux";
import { 
  updateEmployeeStart,
  updateEmployeeSuccess,
  updateEmployeeFailure 
} from "../store/employeeSlice/employeeSlice.js";

// imports for firebase storage
import { app } from "../firebase/firebaseConfig.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

export default function EmployeeProfile() {
  const { currentUser, error } = useSelector(state => state.employee);

  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(image) {
      handleImageUpload(image);
    }
  }, [image])

  const handleImageUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateEmployeeStart());
      const res = await fetch(`/api/employee/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false) {
        dispatch(updateEmployeeFailure(data));
        return;
      };
      dispatch(updateEmployeeSuccess(data));
      Swal.fire({
        title: "Good job!",
        text: "Successfully updated your profile!",
        icon: "success"
      });
    } catch (error) {
      dispatch(updateEmployeeSuccess(error));
    };
  };

  return (
    <section className="flex flex-col justify-center max-w-[600px] mx-auto">
      <h1 className="text-xl self-center">My Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img 
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile" 
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mb-3"
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
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex gap-5">
            <TextField 
              id="firstName" 
              label="First Name" 
              variant="standard" 
              color="success"
              className="flex-1"
              defaultValue={currentUser.firstName}
              onChange={handleChange}
            />
            <TextField 
              id="lastName" 
              label="Last Name" 
              variant="standard" 
              color="success"
              className="flex-1"
              defaultValue={currentUser.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-5">
            <TextField 
              id="birthdate" 
              label="Birthdate" 
              variant="standard" 
              color="success"
              className="flex-1"
              defaultValue={currentUser.birthDate.slice(0, 10)}
              onChange={handleChange}
            />

            <TextField
              id="gender"
              label="Gender"
              variant="standard" 
              color="success"
              className="flex-1"
              defaultValue={currentUser.gender}
              onChange={handleChange}
            />
          </div>
          
          <TextField 
            id="address" 
            label="Address" 
            variant="standard" 
            color="success"
            defaultValue={currentUser.address}
            onChange={handleChange}
          />
          <TextField 
            id="email" 
            type="email"
            label="Email" 
            variant="standard" 
            color="success"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <TextField 
            id="number" 
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            label="Contact Number" 
            variant="standard" 
            color="success"
            defaultValue={currentUser.phoneNumber}
            onChange={handleChange}
          />
          <TextField 
            disabled
            id="ID" 
            label="Company ID" 
            variant="standard" 
            color="success"
            defaultValue={currentUser.ID}
            onChange={handleChange}
          />
          <TextField
            id="designation"
            label="Designation"
            variant="standard" 
            color="success"
            defaultValue={currentUser.designation}
            onChange={handleChange}
          />
          <TextField
            disabled
            id="salary"
            label="Salary"
            variant="standard" 
            color="success"
            defaultValue={`$${currentUser.salary}`}
            onChange={handleChange}
          />
        </div>

        {/* change Password Section */}
        <h2 className="mt-5 text-lg">Change Password!</h2>
        <TextField 
          id="password" 
          label="New Password" 
          variant="standard" 
          color="success"
          onChange={handleChange}
        />
        <TextField 
          id="password1" 
          label="Confirm Password" 
          variant="standard" 
          color="success"
        />
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
          sx={{ marginTop: '20px',  padding: '10px' }}
        >
          UPDATE
        </Button> 
      </form>
    </section> 
  )
}
