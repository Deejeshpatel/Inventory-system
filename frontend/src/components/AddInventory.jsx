import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import './AddInventory.css'; // Import the external CSS file

const AddInventory = () => {
    const [form, setForm] = useState({ name: "", category: "", quantity: "", supplierId: "" });
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await api.get("/api/suppliers");
                if (Array.isArray(response.data)) {
                    setSuppliers(response.data);
                } else {
                    console.error("Expected an array but received:", response.data);
                }
            } catch (error) {
                console.error("Error fetching suppliers:", error);
            }
        };
        fetchSuppliers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/inventorys", form);
            alert("Inventory item added!");
            navigate('/');
            setForm({ name: "", category: "", quantity: "", supplierId: "" });
        } catch (error) {
            console.error("Error adding inventory item:", error);
            alert("Failed to add inventory item.");
        }
    };

    return (
        <div className="inventory-container">
            <h2 className="inventory-heading">Add New Inventory</h2>
            <form onSubmit={handleSubmit} className="inventory-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Item Name"
                    onChange={handleChange}
                    value={form.name}
                    className="inventory-input"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleChange}
                    value={form.category}
                    className="inventory-input"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    onChange={handleChange}
                    value={form.quantity}
                    className="inventory-input"
                    required
                />
                <select
                    name="supplierId"
                    onChange={handleChange}
                    value={form.supplierId}
                    className="inventory-select"
                    required
                >
                    <option value="" disabled>Select Supplier</option>
                    {suppliers.map((supplier) => (
                        <option key={supplier._id} value={supplier._id}>
                            {supplier.name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="inventory-button">
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddInventory;
