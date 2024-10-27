import { useEffect, useState } from "react";
import { evParseData } from "../utils/parseData";
import { BarChartMake } from "../components/BarChartMake";
import { PieChartCon } from "../components/PieChartCon";
import { BarChartCon } from "../components/BarChartCon";
import { StackedBarChart } from "../components/StackedBarChart";

export const Dashboard = () => {

  const [data, setData] = useState([]);
  const [pieChart, setPieChartData] = useState([]);
  const [byCountyData, setByCountyData] = useState([]);
  const [vehicleWiseData, setVehicleWiseData] = useState([]);
  const [conclusiveFigures, setConclusiveFigures] = useState({ totalVehicles: 0, uniqueMakes: 0, uniqueModels: 0 });

  useEffect(() => {

    const fetchData = async () => {
      try {
        const parsedData = await evParseData('/Electric_Vehicle_Population_Data.csv');
        console.log('parsed Data', parsedData)
        const makeCount = parsedData.reduce((acc, item) => {
          acc[item.Make] = (acc[item.Make] || 0) + 1;
          return acc;
        }, {});

        const pieChartData = Object.entries(makeCount).map(([Make, count]) => ({ Make, Count: count }));

        const countyCount = parsedData.reduce((acc, item) => {
          acc[item.County] = (acc[item.County] || 0) + 1;
          return acc;
        }, {});

        const barChartData = Object.entries(countyCount).map(([County, Count]) => ({ County, Count }));

        const vehicleWise = parsedData.reduce((acc, item) => {
          const county = item.County;
          const type = item['Electric Vehicle Type'];

          if (!acc[county]) {
            acc[county] = { County: county, BEV: 0, PHEV: 0 };
          }

          if (type === 'Battery Electric Vehicle (BEV)') {
            acc[county].BEV += 1;
          } else if (type === 'Plug-in Hybrid Electric Vehicle (PHEV)') {
            acc[county].PHEV += 1;
          }

          return acc;
        }, {});

        const sortedCounties = Object.values(vehicleWise)
          .map(item => ({
            ...item,
            Total: item.BEV + item.PHEV
          }))
          .sort((a, b) => b.Total - a.Total)
          .slice(0, 3);

        setVehicleWiseData(sortedCounties);
        setByCountyData(barChartData);
        setPieChartData(pieChartData);
        setData(parsedData);

        const uniqueMakes = new Set(parsedData.map(item => item.Make)).size;
        const uniqueModels = new Set(parsedData.map(item => item.Model)).size;

        setConclusiveFigures({
          totalVehicles: parsedData.length,
          uniqueMakes,
          uniqueModels
        });

      } catch (error) {
        console.error('Error fetching and parsing CSV:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="header-container">EV Dashboard</div>
      <div className="header-lables">
        <div className="outer-lable card">
          <div>Total Vehicle</div>
          <div>{conclusiveFigures.totalVehicles}</div>
        </div>
        <div className="outer-lable card">
          <div>Unique Makes Vehicle</div>
          <div>{conclusiveFigures.uniqueMakes}</div>
        </div>
        <div className="outer-lable card">
          <div>Unique Model Vehicle</div>
          <div>{conclusiveFigures.uniqueModels}</div>
        </div>
      </div>

      {data.length > 0 ? <div className="box">
        <div className="bar-chart">
        <BarChartMake data={data} />  
        </div>
        <div className="pie-chart">
        <PieChartCon data={pieChart} />  
        </div>
        <div className="bar-chart">
        <BarChartCon data={byCountyData} />
        </div>
        <div className="pie-chart">
        <StackedBarChart data={vehicleWiseData} />
        </div>        
        
        
      </div> : <div>Loading....</div>}

    </>
  )
}