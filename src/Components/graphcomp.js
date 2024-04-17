import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const GraphComponent = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8080/api/machine-data');
      setData(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) {
      setChartData({
        labels: data.map(item => item.timestamp),
        datasets: [
          {
            label: 'Sample',
            data: data.map(item => (item.sample === 0 ? 0 : 1)),
            backgroundColor: data.map(item => (item.sample === 0 ? 'yellow' : 'green')),
          },
        ],
      });
    }
  }, [data]);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default GraphComponent;

// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// import 'chart.js/auto'; // import the chart.js library

// // define the Chart object at the top level of the module
// const Chart = window.Chart;

// // define the chartData and chartOptions variables at the top level of the module
// let chartData, chartOptions;

// const GraphComponent = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/machine-data');
//         setData(response.data);
//       } catch (error) {
//         setError(error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (data.length) {
//       chartData = {
//         labels: data.map(item => item.timestamp),
//         datasets: [
//           {
//             label: 'Sample',
//             data: data.map(item => (item.sample === 0 ? 0 : 1)),
//             backgroundColor: data.map(item => (item.sample === 0 ? 'yellow' : 'green')),
//           },
//         ],
//       };

//       chartOptions = {
//         responsive: true,
//         scales: {
//           x: {
//             type: 'time',
//             time: {
//               unit: 'hour',
//             },
//           },
//           y: {
//             beginAtZero: true,
//           },
//         },
//       };

//       // create the chart instance
//       const ctx = document.getElementById('chart').getContext('2d');
//       const chart = new Chart(ctx, {
//         type: 'bar',
//         data: chartData,
//         options: chartOptions,
//       });

//       // update the chart instance when the data changes
//       return () => chart.destroy();
//     }
//   }, [data]);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <Bar data={chartData} options={chartOptions} />
//       <canvas id="chart" />
//     </div>
//   );
// };

// export default GraphComponent;