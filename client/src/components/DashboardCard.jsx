import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardCard({ title, icon, value, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  // Employees data from API
  // const [collection, setCollection] = useState({});
  const [totalEmployee, setTotalEmployee] = useState(0);
  // const [salary, setSalary] = useState([]);
  const salaryArr = [];

  useEffect(() => {
    const searchEmployee = async () => {
      try {
        const res = await fetch('/api/employee/list', { method: 'GET' });
        const data = await res.json();
        // setCollection(data);
        setTotalEmployee(data.length);
        
        // data.map((employee)=>(
        //   setSalary([
        //     ...salary, employee.salary
        //   ])
        // ))

      } catch (error) {
        console.log(error);
      }
    };
  
    searchEmployee();
  }, [])

  // console.log(salary);
  return (
    <div onClick={handleClick} className='flex flex-col flex-1 rounded-lg border-[1px] border-green-600 p-5 cursor-pointer'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-xl'>{title}</h3>
        <img src={icon} alt={title} />
      </div>
      <div className='text-2xl font-[300] text-slate-600'>{`${value || totalEmployee || '$'+salaryArr}`}</div>
    </div>
  )
}