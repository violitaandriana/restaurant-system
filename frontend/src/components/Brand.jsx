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

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setShowMessage(false);
    
    try {
      const response = await api.request("/brands");
      setBrands(response.brands);
    } catch (err) {
      console.error("Failed to fetch brands:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowMessage(false);
    
    try {
      if (editingBrand) {
        const response = await api.put(`/brands/${editingBrand.id}`, formData);
        setMessage(response.message);
      } else {
        const response = await api.post("/brands", formData);
        setMessage(response.message);
      }
      
      setShowMessage(true);
      fetchBrands();
      resetForm();
    } catch (err) {
      console.error("Failed to save brands:", err);
    }
  };

  const handleEdit = (brand) => {
    setShowMessage(false);
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
    });
    setShowForm(true);
  };

  console.log(showMessage)

  const handleDelete = async (id) => {
    setShowMessage(false);
    if (window.confirm("Are you sure you want to delete this brand item?")) {
      try {
        const response = await api.delete(`/brands/${id}`);
        fetchBrands();
        setMessage(response.message);
        setShowMessage(true);
      } catch (err) {
        setMessage("Failed to delete brand:", err);
        setShowMessage(true);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
    });
    setEditingBrand(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Master Brand</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Tambah Brand
        </button>
      </div>

      <div className={`my-4 alert-msg${showMessage ? " block" : " hidden"}`}>
        {message}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingBrand ? "Edit Brand" : "Add New Brand"}
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

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg"
                >
                  {editingBrand ? "Update" : "Create"}
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
                  Brand ID
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Nama
                </th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {brands?.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium">{brand.id}</td>
                  <td className="py-3 px-4 font-medium">{brand.name}</td>
                  <td className="flex gap-2 place-content-center p-2">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id)}
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

export default Brand;
