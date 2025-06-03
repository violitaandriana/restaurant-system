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

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rayon_id: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.request("/customers");
      setCustomers(response.customers);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCustomer) {
        await api.put(`/customers/${editingCustomer.id}`, formData);
      } else {
        await api.post("/customers", formData);
      }

      fetchCustomers();
      resetForm();
    } catch (err) {
      console.error("Failed to save customers:", err);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      address: customer.address,
      rayon_id: customer.rayon_id,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer item?")) {
      try {
        await api.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        console.error("Failed to delete customer:", err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      rayon_id: "",
    });
    setEditingCustomer(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Master Customer</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Customer
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingCustomer ? "Edit Customer" : "Add New Customer"}
              </h2>
              <button onClick={resetForm}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rayon
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

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
                >
                  {editingCustomer ? "Update" : "Create"}
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
                  Customer ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Nama
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Alamat
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Rayon
                </th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{customer.id}</td>
                  <td className="py-3 px-4 font-medium">{customer.name}</td>
                  <td className="py-3 px-4 font-medium">{customer.address}</td>
                  <td className="py-3 px-4 font-medium">{customer.rayon_id}</td>
                  <td className="flex gap-2 place-content-center p-2">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
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

export default Customer;
