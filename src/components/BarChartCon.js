import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const BarChartCon = ({data}) => {
    return(<>
        <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="County" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
    </>)
}