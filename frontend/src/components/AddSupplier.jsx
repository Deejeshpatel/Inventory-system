import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./AddSupplier.css"; // Import external CSS file

const AddSupplier = () => {
    const [form, setForm] = useState({ name: "", contact: "", email: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/suppliers", form);
            alert("Supplier added successfully!");
            navigate('/supplier');
            setForm({ name: "", contact: "", email: "" });
        } catch (error) {
            console.error("Error adding supplier");
            alert("Failed to add supplier.");
        }
    };

    return (
        <div className="supplier-container">
            <h2 className="supplier-heading">Add New Supplier</h2>
            <form onSubmit={handleSubmit} className="supplier-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Supplier Name"
                    onChange={handleChange}
                    value={form.name}
                    className="supplier-input"
                    required
                />
                <input
                    type="number"
                    name="contact"
                    placeholder="Contact Number"
                    onChange={handleChange}
                    value={form.contact}
                    className="supplier-input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={form.email}
                    className="supplier-input"
                    required
                />
                <button type="submit" className="supplier-button">
                    Add Supplier
                </button>
            </form>
        </div>
    );
};

export default AddSupplier;
