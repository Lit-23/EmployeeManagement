import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TenureBarChart() {
  const data = [
    {
      name: '0-1 yr.',
      female: 400,
      male: 240,
      amt: 240,
    },
    {
      name: '1-3 yrs',
      female: 300,
      male: 139,
      amt: 221,
    },
    {
      name: '3-5 yrs',
      female: 200,
      male: 980,
      amt: 229,
    },
    {
      name: '5-7 yrs',
      female: 278,
      male: 390,
      amt: 200,
    },
    {
      name: '7-9 yrs',
      female: 189,
      male: 480,
      amt: 218,
    },
    {
      name: '9-10 yrs',
      female: 239,
      male: 380,
      amt: 250,
    },
    {
      name: '10+ yrs.',
      female: 349,
      male: 430,
      amt: 210,
    },
  ];

  return (
    <div className='h-[400px] flex-1'>
      <h2 className='text-lg text-center'>
        Employees Tenure and Attrition <br />
        <span className='text-slate-500'>(head count)</span>
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="female" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="male" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
