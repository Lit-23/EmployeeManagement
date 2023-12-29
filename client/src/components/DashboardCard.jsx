import React from 'react'

export default function DashboardCard({ title, icon, value }) {
  return (
    <div className='flex flex-col flex-1 rounded-lg border-[1px] border-green-600 p-5'>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='text-xl'>{title}</h3>
        <img src={icon} alt={title} />
      </div>
      <div className='text-2xl font-[300] text-slate-600'>{value}</div>
    </div>
  )
}