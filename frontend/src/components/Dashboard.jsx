import { useEffect, useState } from "react";
import api from "../api";
import BarChart from "./BarChart";

const Dashboard = () => {
  const [datas, setDatas] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    try {
      const response = await api.request("/dashboard");
      const rawData = response.data.salesTrendByBrandByMonth;

      // get unique month
      const uniqueMonths = Array.from(
        new Set(rawData.map((d) => d.month))
      ).sort();

      // get unique brand
      const uniqueBrands = Array.from(
        new Set(rawData.map((d) => d.brand_name))
      );

      // build datasets
      const newDatasets = uniqueBrands.map((brand, i) => {
        const dataPerMonth = uniqueMonths.map((month) => {
          const record = rawData.find(
            (d) => d.brand_name === brand && d.month === month
          );
          return record ? record.total_orders : 0;
        });

        const colors = [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ];

        return {
          label: brand,
          data: dataPerMonth,
          backgroundColor: colors[i % colors.length],
        };
      });

      setLabels(uniqueMonths);
      setDatasets(newDatasets);

      setDatas(response.data);
    } catch (err) {
      console.error("Failed to fetch dashboard:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>
      {/* Report Column Chart : Trend penjualan per brand per bulan */}
      <div className="h-[400px]">
        <BarChart
          key={1}
          titleText={"Trend Penjualan Brand per Bulan"}
          labels={labels}
          datasets={datasets}
        />
      </div>
    </div>
  );
};
export default Dashboard;
