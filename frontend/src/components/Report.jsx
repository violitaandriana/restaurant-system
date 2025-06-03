import { useEffect, useState } from "react";
import api from "../api";

const Report = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetchDatas();
  }, []);

  const fetchDatas = async () => {
    try {
      const response = await api.request("/reports");
      setDatas(response.data);
    } catch (err) {
      console.error("Failed to fetch report:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Report</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Report 4 so groupBy Brand */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Brand ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Bulan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Total Qty
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.soByBrand?.map((data) => (
                  <tr
                    key={`${data.brand_id} . ${data.month}`}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{data.brand_id}</td>
                    <td className="py-3 px-4 font-medium">{data.month}</td>
                    <td className="py-3 px-4 font-medium">
                      {data.total_qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report 5 topSalesByArea */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Area
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Total Qty
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.topSalesByArea?.map((data) => (
                  <tr
                    key={data.sales_area}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{data.sales_area}</td>
                    <td className="py-3 px-4 font-medium">
                      {data.total_qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report 7 topSalesByBrand */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Brand
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Total Qty
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.topSalesByBrand?.map((data) => (
                  <tr
                    key={data.brand_id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{data.brand_name}</td>
                    <td className="py-3 px-4 font-medium">
                      {data.total_qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Report;
