import { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { ongoingIcon, completedIcon, salaryIcon, employeeIcon } from '../assets/icons';
import TenureBarChart from '../components/TenureBarChart';
import DesignationLineChart from '../components/DesignationLineChart';
import Swal from 'sweetalert2';
import {
  searchEmployeeListStart,
  searchEmployeeListSuccess,
  searchEmployeeListFailure,
} from '../store/employeeSlice/employeeSlice.js';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const [collection, setCollection] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const { loading } = useSelector(state => state.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchEmployee = async () => {
      try {
        dispatch(searchEmployeeListStart());
        if(loading === true) {
          Swal.showLoading();
        } else {
          Swal.hideLoading();
        };
        const res = await fetch('/api/employee/list', { method: 'GET' });
        const data = await res.json();
        setCollection(data);
        setTotalEmployee(data.length);
        dispatch(searchEmployeeListSuccess(data));
      } catch (error) {
        dispatch(searchEmployeeListFailure(error));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log('error fetching!');
      }
    };
    searchEmployee();
  }, [])

  const total = collection.reduce((acc, employee) => Number(acc) + Number(employee.salary), 0);
  const avgSalary = total/totalEmployee;

  return (
    <section>
      <h1 className='text-xl mb-4'>Dashboard</h1>
      <div className='flex max-[769px]:flex-col justify-between gap-3 mb-5'>
        <DashboardCard title={'Ongoing Projects'} icon={ongoingIcon} value={5} link='/ongoing-projects'/>
        <DashboardCard title={'Completed Projects'} icon={completedIcon} value={20} link='/completed-projects'/>
        <DashboardCard title={'Employees'} icon={employeeIcon} value={totalEmployee} link='/employee-list'/>
        <DashboardCard title={'Avg. Salary'} icon={salaryIcon} value={'$' + (avgSalary).toFixed(0)}/>
      </div>

      <div className='flex max-[769px]:flex-col justify-center gap-10 max-[769px]:gap-5'>
        <TenureBarChart />
        <DesignationLineChart />
      </div>
    </section>
  )
}
