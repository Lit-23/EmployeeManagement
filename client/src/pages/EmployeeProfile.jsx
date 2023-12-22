import { useRef } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function EmployeeProfile() {
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="flex flex-col justify-center">
      <h1 className="text-xl self-center">My Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col mx-auto">
        <input 
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*"
          // onChange={(e) => setImage(e.target.files[0])}
        />
        <img 
          src='https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif' 
          alt="profile" 
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover my-5"
          onClick={() => fileRef.current.click()}
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-5">
            <TextField 
              id="first-name" 
              label="First Name" 
              variant="standard" 
              color="success"
              defaultValue="Con"
              className="flex-1"
            />
            <TextField 
              id="last-name" 
              label="Last Name" 
              variant="standard" 
              color="success"
              defaultValue="Doriano"
              className="flex-1"
            />
          </div>

          <div className="flex gap-5">
            <TextField 
              id="birthdate" 
              // type="date"
              label="Birthdate" 
              variant="standard" 
              color="success"
              defaultValue="12/23/1998"
              className="flex-1"
            />

            <TextField
              id="gender"
              select
              label="Gender"
              defaultValue="MALE"
              className="flex-1"
              SelectProps={{
                native: true
              }}
              variant="standard"
            >
              <option key='male' value='male'>
                MALE
              </option>
              <option key='female' value='female'>
                FEMALE
              </option>
            </TextField>
          </div>
          
          <TextField 
            id="address" 
            label="Address" 
            variant="standard" 
            color="success"
            defaultValue="taga doon"
          />
          <TextField 
            id="email" 
            type="email"
            label="Email" 
            variant="standard" 
            color="success"
            defaultValue="example@gmail.com"
          />
          <TextField 
            id="number" 
            type="number"
            label="Contact Number" 
            variant="standard" 
            color="success"
            defaultValue="09123456781"
          />
          <TextField 
            id="id" 
            label="Company ID" 
            variant="standard" 
            color="success"
            defaultValue="123456"
          />
          <TextField
            id="Department"
            select
            label="Department"
            defaultValue="Full-stack"
            SelectProps={{
              native: true
            }}
            variant="standard"
          >
            <option key='Design' value='Design'>
              Design
            </option>
            <option key='Front-end' value='Front-end'>
              Front-end
            </option>
            <option key='Back-end' value='Back-end'>
              Back-end
            </option>
            <option key='Full-stack' value='Full-stack'>
              Full-stack
            </option>
          </TextField>
        </div>
        <Button 
          type='submit' 
          variant="outlined" 
          color="success" 
          sx={{ marginTop: '20px' }}
        >
          UPDATE
        </Button>
      </form>
    </section> 
  )
}
