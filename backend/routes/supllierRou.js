const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supllierCon");

router.post("/", supplierController.addSupplier);
router.get("/", supplierController.getAllSuppliers);
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
