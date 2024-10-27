import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export const PieChartCon = ({data}) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5D5D'];

    return(<>
        <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="Count"
          nameKey="Make"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />      
      </PieChart>
    </ResponsiveContainer>
    </>)
}