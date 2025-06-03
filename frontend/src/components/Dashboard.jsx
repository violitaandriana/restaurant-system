import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  DollarSign,
  ShoppingBag,
  Clock,
  ChefHat,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import api from "../api";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Dashboard = () => {
  const [stats, setStats] = useState({
    today_orders: 0,
    today_revenue: 0,
    total_menus: 0,
    recent_orders: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.request("/dashboard");
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-100",
      preparing: "text-blue-600 bg-blue-100",
      ready: "text-green-600 bg-green-100",
      completed: "text-gray-600 bg-gray-100",
      cancelled: "text-red-600 bg-red-100",
    };
    return colors[status] || "text-gray-600 bg-gray-100";
  };

  // const formatToDate = (created_at) => {
  //   const date = new Date(created_at);
  //   return date.toLocaleDateString('en-GB');
  // }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Today's Orders
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.today_orders}
              </p>
            </div>
            <ShoppingBag className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Today's Revenue
              </p>
              <p className="text-3xl font-bold text-gray-900">
                Rp {stats.today_revenue?.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Menu Items
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.total_menus}
              </p>
            </div>
            <Menu className="w-12 h-12 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Orders</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.recent_orders?.filter(
                  (order) => !["completed", "cancelled"].includes(order.status)
                ).length || 0}
              </p>
            </div>
            <Clock className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[360px]">
        <div className="">
          <BarChart
            key={1}
            titleText={"Top 5 Customer"}
            labels={stats.orders_by_cust?.map((order) => order.customer_name)}
            dtLabel={"Total amount"}
            dtData={stats.orders_by_cust?.map((order) => order.total) || []}
            bgColor={"rgba(53, 162, 235, 0.5)"}
          />
        </div>
        <div className="">
          <BarChart
            key={2}
            titleText={"Top 5 Menus"}
            labels={stats.top_order_menus?.map((order) => order.name)}
            dtLabel={"Total"}
            dtData={
              stats.top_order_menus?.map((order) => order.total_quantity) || []
            }
            bgColor={"rgba(33, 120, 135, 0.5)"}
          />
        </div>
        <div className="">
          <BarChart
            key={3}
            titleText={"Order Status"}
            labels={stats.orders_by_status?.map((order) => order.status)}
            dtLabel={"Total"}
            dtData={stats.orders_by_status?.map((order) => order.total) || []}
            bgColor={"rgba(53, 140, 235, 0.5)"}
          />
        </div>
      </div>

      {/* Line Chart */}
      <div className="h-[360px] my-8">
        <LineChart
          key={4}
          titleText={"Order by Days"}
          labels={stats.orders_by_days?.map((order) => order.date)}
          dtLabel={"Total"}
          dtData={stats.orders_by_days?.map((order) => order.total) || []}
          bgColor={"rgba(53, 162, 235, 0.5)"}
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Customer
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Table
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_orders?.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">#{order.id}</td>
                  <td className="py-3 px-4">{order.customer_name}</td>
                  <td className="py-3 px-4">Table {order.table_number}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    Rp {parseFloat(order.total_amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
