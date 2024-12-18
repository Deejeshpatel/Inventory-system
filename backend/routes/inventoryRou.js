const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryCon");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/export", inventoryController.exportCSV);
router.post("/import", upload.single("file"), inventoryController.importCSV);
router.post("/", inventoryController.addInventory);
router.get("/", inventoryController.getAllInventory);
router.get('/:id', inventoryController.getSingleInventory);
router.put("/:id", inventoryController.updateInventory);
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;