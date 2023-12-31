import { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { ongoingIcon, completedIcon, salaryIcon, employeeIcon } from '../assets/icons';
import TenureBarChart from '../components/TenureBarChart';
import DesignationLineChart from '../components/DesignationLineChart';

export default function Dashboard() {
  const [collection, setCollection] = useState([]);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    const searchEmployee = async () => {
      try {
        const res = await fetch('/api/employee/list', { method: 'GET' });
        const data = await res.json();
        setCollection(data);
        setTotalEmployee(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    searchEmployee();

    const searchSalary = async () => {
      try { 
        collection.map((employee) => setTotalSalary(prev => (prev + Number(employee.salary))))
        console.log(totalSalary);
  
      } catch (error) {
        console.log(error);
      }
    };
  
    searchSalary();
  }, [])

  return (
    <section>
      <h1 className='text-xl mb-4'>Dashboard</h1>
      <div className='flex max-[769px]:flex-col justify-between gap-3 mb-5'>
        <DashboardCard title={'Ongoing Projects'} icon={ongoingIcon} value={5} link='/ongoing-projects'/>
        <DashboardCard title={'Completed Projects'} icon={completedIcon} value={20} link='/completed-projects'/>
        <DashboardCard title={'Employees'} icon={employeeIcon} value={totalEmployee} link='/employee-list'/>
        <DashboardCard title={'Avg. Salary'} icon={salaryIcon} value={'$' + (totalSalary/totalEmployee).toFixed(0)}/>
      </div>

      <div className='flex max-[769px]:flex-col justify-center gap-10 max-[769px]:gap-5'>
        <TenureBarChart />
        <DesignationLineChart />
      </div>
    </section>
  )
}
