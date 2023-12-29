import { useState, useEffect } from 'react';
import ongoingProjects from '../constants/ongoingProjects.json';
import completedProjects from '../constants/completedProjects.json';
import DashboardCard from '../components/DashboardCard';
import { ongoingIcon, completedIcon, salaryIcon, employeeIcon } from '../assets/icons';
import DesignationPieChart from '../components/DesignationPieChart';
import TenureLineChart from '../components/TenureLineChart';

export default function Dashboard() {
  // completed project
  // ongoing project
  // avg. salary
  // employee

  return (
    <section>
      <h1 className='text-xl mb-4'>Dashboard</h1>
      <div className='flex max-[769px]:flex-col justify-between gap-3 mb-5'>
        <DashboardCard title={'Ongoing Projects'} icon={ongoingIcon} value={5} link='/ongoing-projects'/>
        <DashboardCard title={'Completed Projects'} icon={completedIcon} value={20} link='/completed-projects'/>
        <DashboardCard title={'Employees'} icon={employeeIcon} value={5} link='/employee-list'/>
        <DashboardCard title={'Avg. Salary'} icon={salaryIcon} value={`$${500}`}/>
      </div>

      <div className='flex max-[769px]:flex-col justify-center gap-10 max-[769px]:gap-5'>
        <DesignationPieChart />
        <TenureLineChart />
      </div>
    </section>
  )
}
