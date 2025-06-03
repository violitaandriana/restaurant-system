import React, { useState, useEffect } from "react";

import Dashboard from "./Dashboard";
import Brand from "./Brand";
import Customer from "./Customer";
import Salesman from "./Salesman";
import Rayon from "./Rayon";
import SalesOrder from "./SalesOrder";

import api from "../api";
import Report from "./Report";

const WebAdmin = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .request("/dashboard")
      .finally(() => setLoading(false));
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      // icon: <Users className="w-5 h-5" />,
    },
    {
      id: "brands",
      label: "Master Brand",
      // icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "customers",
      label: "Master Customer",
      // icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "salesmen",
      label: "Master Salesman",
      // icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "rayons",
      label: "Master Rayon",
      // icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "so",
      label: "Master SO",
      // icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "reports",
      label: "Report",
      // icon: <Menu className="w-5 h-5" />,
    },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "brands":
        return <Brand />;
      case "customers":
        return <Customer />;
      case "salesmen":
        return <Salesman />;
      case "rayons":
        return <Rayon />;
      case "so":
        return <SalesOrder />;
      case "reports":
        return <Report />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-8 w-8 text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-16"
          } lg:w-64`}
        >
          <div className="p-4">
            <div className="flex items-center gap-3">
              <h1
                className={`font-bold text-xl text-gray-800 ${
                  sidebarOpen ? "block" : "hidden"
                } lg:block`}
              >
                Technical Test
              </h1>
            </div>
          </div>

          <nav className="mt-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 transition-colors ${
                  currentPage === item.id
                    ? "bg-orange-100 border-r-4 border-orange-500 text-orange-700"
                    : "text-gray-600"
                }`}
              >
                {item.icon}
                <span
                  className={`${sidebarOpen ? "block" : "hidden"} lg:block`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-600 hover:text-gray-800"
              >
                {/* <Menu className="w-6 h-6" /> */}
              </button>

              <div className="flex items-center gap-4">
                <span className="text-gray-600">Welcome</span>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
        </div>
      </div>
    </>
  );
};
export default WebAdmin;
