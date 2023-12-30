import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DepartmentLineChart() {
  const data = [
    {
      name: 'DE',
      male: 240,
      female: 400,
      amt: 240,
    },
    {
      name: 'FE',
      male: 139,
      female: 300,
      amt: 221,
    },
    {
      name: 'BE',
      male: 980,
      female: 200,
      amt: 220,
    },
    {
      name: 'FS',
      male: 390,
      female: 278,
      amt: 200,
    },
    {
      name: 'MD',
      male: 480,
      female: 189,
      amt: 218,
    },
    {
      name: 'WD',
      male: 380,
      female: 239,
      amt: 250,
    },
    {
      name: 'CS',
      male: 430,
      female: 349,
      amt: 210,
    },
  ];

  return (
    <div className='h-[400px] flex-1'>
      <h2 className='text-lg text-center'>
        Employees Department Demographics <br />
        <span className='text-slate-500'>(head count)</span>
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Line type="monotone" dataKey="female" stroke="#8884d8" />
          <Line type="monotone" dataKey="male" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
