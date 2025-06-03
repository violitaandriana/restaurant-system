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

const Salesman = () => {
  const [salesmans, setSalesmans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSalesman, setEditingSalesman] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    rayon_id: "",
  });

  useEffect(() => {
    fetchSalesmans();
  }, []);

  const fetchSalesmans = async () => {
    try {
      const response = await api.request("/salesmen");
      setSalesmans(response.salesmen);
    } catch (err) {
      console.error("Failed to fetch salesmen:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSalesman) {
        await api.put(`/salesmen/${editingSalesman.id}`, formData);
      } else {
        await api.post("/salesmen", formData);
      }

      fetchSalesmans();
      resetForm();
    } catch (err) {
      console.error("Failed to save salesmen:", err);
    }
  };

  const handleEdit = (salesman) => {
    setEditingSalesman(salesman);
    setFormData({
      name: salesman.name,
      type: salesman.type,
      rayon_id: salesman.rayon_id,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Salesman item?")) {
      try {
        await api.delete(`/salesmen/${id}`);
        fetchSalesmans();
      } catch (err) {
        console.error("Failed to delete Salesman:", err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      rayon_id: "",
    });
    setEditingSalesman(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Master Salesman</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Salesman
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingSalesman ? "Edit Salesman" : "Add New Salesman"}
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
                  Tipe
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
                  {editingSalesman ? "Update" : "Create"}
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
                  Salesman ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Nama
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Tipe
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Rayon
                </th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {salesmans?.map((salesman) => (
                <tr
                  key={salesman.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{salesman.id}</td>
                  <td className="py-3 px-4 font-medium">{salesman.name}</td>
                  <td className="py-3 px-4 font-medium">{salesman.type}</td>
                  <td className="py-3 px-4 font-medium">{salesman.rayon_id}</td>
                  <td className="flex gap-2 place-content-center p-2">
                    <button
                      onClick={() => handleEdit(salesman)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(salesman.id)}
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

export default Salesman;
