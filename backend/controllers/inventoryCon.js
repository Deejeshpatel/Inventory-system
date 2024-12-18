const Inventory = require("../models/Inventory");
const Supplier = require("../models/Supllier");
const { parseCSV, generateCSV } = require("../config/csv");

exports.addInventory = async (req, res) => {
    try {
        const { name, quantity, category, supplierId } = req.body;
        const supplier = await Supplier.findById(supplierId);
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });
        const lowStockAlert = quantity < 25;
        const inventory = new Inventory({ name, quantity, category, supplier: supplierId, lowStockAlert });
        await inventory.save();
        res.status(201).json(inventory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllInventory = async (req, res) => {
    try {
        const items = await Inventory.find().populate("supplier");
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSingleInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Inventory.findById(id).populate("supplier");
        if (!item) return res.status(404).json({ message: "Inventory item not found" });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (updateData.quantity < 25){
         updateData.lowStockAlert = true;
        }else{
         updateData.lowStockAlert = false;
        }  
        const item = await Inventory.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteInventory = async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Inventory item deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.exportCSV = async (req, res) => {    
    try {
        const items = await Inventory.find().populate("supplier");
        const csv = generateCSV(items);
        res.header("Content-Type", "text/csv");
        res.attachment("inventory.csv");
        res.send(csv);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.importCSV = async (req, res) => {
    try {
        const items = await parseCSV(req.file.path);
        await Inventory.insertMany(items);
        res.status(200).json({ message: "CSV imported successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};