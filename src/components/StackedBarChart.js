import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const StackedBarChart = ({data}) => {
    return(<>
        <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="County" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="BEV" stackId="a" fill="#8884d8" name="Battery Electric Vehicle (BEV)" />
        <Bar dataKey="PHEV" stackId="a" fill="#82ca9d" name="Plug-in Hybrid Electric Vehicle (PHEV)" />
      </BarChart>
    </ResponsiveContainer>
    </>)
}