import React, { useEffect, useState } from "react";
import api from "../api";
import { FaEdit, FaTrashAlt, FaFileImport, FaFileExport } from "react-icons/fa";
import EditInventoryModal from "./EditInventory";
import Papa from "papaparse";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get("/api/inventorys");
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/api/inventorys/${id}`);
        setInventory(inventory.filter((item) => item._id !== id));
        alert("Item deleted successfully!");
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item.");
      }
    }
  };

  const openEditModal = (id) => {
    setSelectedItemId(id);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    setModalOpen(false);
    setSelectedItemId(null);
  };

  const refreshInventory = async () => {
    try {
      const response = await api.get("/api/inventorys");
      setInventory(response.data);
    } catch (error) {
      console.error("Error refreshing inventory:", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get("/api/inventorys/export", {
        headers: {
          Accept: "text/csv",
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("Failed to export data.");
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      const csv = e.target.result;
      const parsedData = Papa.parse(csv, { header: true });

      if (parsedData.errors.length) {
        console.error("CSV parsing errors:", parsedData.errors);
        alert("Error parsing CSV file.");
        return;
      }

      const inventoryItems = parsedData.data.map((item) => ({
        name: item.name,
        quantity: Number(item.quantity),
        category: item.category,
        supplier: { name: item.supplier },
        lowStockAlert: item.lowStockAlert === "Yes",
      }));

      try {
        await api.post("/api/inventorys/import", { items: inventoryItems }, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Items imported successfully!");
        refreshInventory();
      } catch (error) {
        console.error("Error importing items:", error);
        alert("Failed to import items.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Inventory Management</h1>

      <div className="flex justify-center mb-10 space-x-6">
        <button
          onClick={handleExport}
          className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-500 transition duration-200"
        >
          <FaFileExport className="mr-2" /> Export Data
        </button>
        <label className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-500 cursor-pointer transition duration-200">
          <FaFileImport className="mr-2" /> Import Data
          <input type="file" accept=".csv" onChange={handleImport} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(inventory) && inventory.length > 0 ? (
          inventory.map((item) => (
            <div
              key={item._id}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition duration-300"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                <p className="text-sm text-gray-500">Category: {item.category}</p>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <span className="font-semibold">Quantity:</span> {item.quantity}
                </li>
                <li>
                  <span className="font-semibold">Supplier:</span> {item.supplier?.name || "N/A"}
                </li>
                <li>
                  <span
                    className={`font-semibold ${
                      item.lowStockAlert ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    Low Stock Alert: {item.lowStockAlert ? "Yes" : "No"}
                  </span>
                </li>
              </ul>
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => openEditModal(item._id)}
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <FaEdit className="inline-block mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <FaTrashAlt className="inline-block mr-2" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No inventory items available.</p>
        )}
      </div>

      <EditInventoryModal
        isOpen={modalOpen}
        onClose={closeEditModal}
        itemId={selectedItemId}
        onUpdate={refreshInventory}
      />
    </div>
  );
};

export default Inventory;
