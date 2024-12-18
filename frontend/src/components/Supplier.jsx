import React, { useEffect, useState } from "react";
import api from "../api";
import { FaTrashAlt } from "react-icons/fa";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await api.get("/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await api.delete(`/api/suppliers/${id}`);
        setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
        alert("Supplier deleted successfully!");
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert("Failed to delete supplier.");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <div className="bg-gradient-to-tr from-indigo-100 to-indigo-50 rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          Supplier Directory
        </h1>
        {suppliers.length > 0 ? (
          <div className="overflow-hidden rounded-lg shadow-lg">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-bold uppercase tracking-wide">
                    Contact
                  </th>
                  <th className="py-4 px-6 text-center text-sm font-bold uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr
                    key={supplier._id}
                    className="hover:bg-indigo-50 transition duration-200"
                  >
                    <td className="py-4 px-6 text-gray-800">{supplier.name}</td>
                    <td className="py-4 px-6 text-gray-800">{supplier.email}</td>
                    <td className="py-4 px-6 text-gray-800">{supplier.contact}</td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleDelete(supplier._id)}
                        className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-2 rounded-lg shadow-md transition duration-300"
                      >
                        <FaTrashAlt className="inline-block mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No suppliers found. Add some to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default Supplier;
