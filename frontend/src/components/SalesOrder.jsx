import { useEffect, useState } from "react";
import api from "../api";
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

const SalesOrder = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSalesOrder, setEditingSalesOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "",
    brand_id: "",
    customer_id: "",
    rayon_id: "",
    salesman_id: "",
    quantity: "",
    qty_unit: "",
  });

  useEffect(() => {
    fetchSalesOrders();
  }, []);

  const fetchSalesOrders = async () => {
    try {
      const response = await api.request("/sales-orders");
      setSalesOrders(response.salesOrders);
    } catch (err) {
      console.error("Failed to fetch sales orders:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSalesOrder) {
        await api.put(`/sales-orders/${editingSalesOrder.id}`, formData);
      } else {
        await api.post("/sales-orders", formData);
      }

      fetchSalesOrders();
      resetForm();
    } catch (err) {
      console.error("Failed to save sales orders:", err);
    }
  };

  const handleEdit = (salesOrder) => {
    setEditingSalesOrder(salesOrder);
    setFormData({
      name: salesOrder.name || "",
      date: salesOrder.date || "",
      type: salesOrder.type || "",
      brand_id: salesOrder.brand_id || "",
      customer_id: salesOrder.customer_id || "",
      rayon_id: salesOrder.rayon_id || "",
      salesman_id: salesOrder.salesman_id || "",
      quantity: salesOrder.quantity || "",
      qty_unit: salesOrder.qty_unit || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this SalesOrder item?")
    ) {
      try {
        await api.delete(`/sales-orders/${id}`);
        fetchSalesOrders();
      } catch (err) {
        console.error("Failed to delete Sales Order:", err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      type: "",
      brand_id: "",
      customer_id: "",
      rayon_id: "",
      salesman_id: "",
      quantity: "",
      qty_unit: "",
    });
    setEditingSalesOrder(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Master Sales Order</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Sales Order
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingSalesOrder ? "Edit Sales Order" : "Add New Sales Order"}
              </h2>
              <button onClick={resetForm}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal SO
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipe SO
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Brand
                </label>
                <input
                  type="text"
                  value={formData.brand_id}
                  onChange={(e) =>
                    setFormData({ ...formData, brand_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Customer
                </label>
                <input
                  type="text"
                  value={formData.customer_id}
                  onChange={(e) =>
                    setFormData({ ...formData, customer_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Rayon
                </label>
                <input
                  type="text"
                  value={formData.rayon_id}
                  onChange={(e) =>
                    setFormData({ ...formData, rayon_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Salesman
                </label>
                <input
                  type="text"
                  value={formData.salesman_id}
                  onChange={(e) =>
                    setFormData({ ...formData, salesman_id: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qty Unit
                </label>
                <input
                  type="text"
                  value={formData.qty_unit}
                  onChange={(e) =>
                    setFormData({ ...formData, qty_unit: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
                >
                  {editingSalesOrder ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  SO ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Tanggal
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Tipe
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Brand ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Customer ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Rayon ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Salesman ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Quantity
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Qty Unit
                </th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders?.map((salesOrder) => (
                <tr
                  key={salesOrder.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{salesOrder.id}</td>
                  <td className="py-3 px-4 font-medium">{salesOrder.date}</td>
                  <td className="py-3 px-4 font-medium">
                    {salesOrder.type}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {salesOrder.brand_id}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {salesOrder.customer_id}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {salesOrder.rayon_id}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {salesOrder.salesman_id}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {salesOrder.quantity}
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {salesOrder.qty_unit}
                  </td>
                  <td className="flex gap-2 place-content-center p-2">
                    <button
                      onClick={() => handleEdit(salesOrder)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(salesOrder.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
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

export default SalesOrder;
