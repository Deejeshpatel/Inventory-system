const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
    lowStockAlert: { type: Boolean, default: false },
});

module.exports = mongoose.model("Inventory", inventorySchema);