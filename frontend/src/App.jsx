import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Inventory from "./components/Inventory";
import AddInventory from "./components/AddInventory";
import Supplier from "./components/Supplier";
import AddSupplier from "./components/AddSupplier";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/addinventory" element={<AddInventory />} />
        <Route path="/addsupplier" element={<AddSupplier />} />
        <Route path="/supplier" element={<Supplier />} />
      </Routes>
    </Router>
  );
}

export default App;