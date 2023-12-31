import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardCard({ title, icon, value, link }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div onClick={handleClick} className='flex flex-col flex-1 rounded-lg border-[1px] border-green-600 p-5 cursor-pointer'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-xl'>{title}</h3>
        <img src={icon} alt={title} />
      </div>
      <div className='text-2xl font-[300] text-slate-600'>
        {value}
      </div>
    </div>
  )
}