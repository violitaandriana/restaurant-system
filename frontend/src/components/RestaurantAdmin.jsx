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
import MenuManagement from "./MenuManagement";
import Dashboard from "./Dashboard";
import Login from "./Login";
import OrderManagement from "./OrderManagement";
import api from "../api";

const RestaurantAdmin = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Check if user is already logged in
    if (api.token) {
      // Verify token by fetching user data
      api
        .request("/user")
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          api.clearToken();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await api.request("/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      api.clearToken();
      setUser(null);
      setLoading(false);
    }
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "menus",
      label: "Menu Management",
      icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "orders",
      label: "Order Management",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
  ];

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "menus":
        return <MenuManagement />;
      case "orders":
        return <OrderManagement />;
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

  // Place this check after all hooks and before any rendering logic
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } lg:w-64`}
      >
        <div className="p-4">
          <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-orange-500" />
            <h1
              className={`font-bold text-xl text-gray-800 ${
                sidebarOpen ? "block" : "hidden"
              } lg:block`}
            >
              Restaurant
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
              <span className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
            <span className={`${sidebarOpen ? "block" : "hidden"} lg:block`}>
              Logout
            </span>
          </button>
        </div>
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
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

export default RestaurantAdmin;
