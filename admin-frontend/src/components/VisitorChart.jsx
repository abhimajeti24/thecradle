import { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const VisitorChart = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  const [view, setView] = useState("weekly"); // default

  const fetchData = async (type) => {
    try {
      const res = await fetch(`http://localhost:5000/api/visitors/${type}`);
      const json = await res.json();
      setLabels(json.labels);
      setData(json.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  useEffect(() => {
    fetchData(view);
  }, [view]);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setView("weekly")}>Weekly</button>
        <button onClick={() => setView("monthly")}>Monthly</button>
        <button onClick={() => setView("yearly")}>Yearly</button>
      </div>

      <LineChart
        xAxis={[{ data: labels }]}
        series={[{ data: data }]}
        height={300}
      />
    </div>
  );
};

export default VisitorChart;
