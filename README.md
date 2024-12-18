# Inventory Management System

## Overview
The Inventory Management System is a web application that allows users to manage inventory items and supplier information efficiently. This application provides a responsive user interface built with React for the frontend and a axios API built with Node.js and MongoDB for the backend.

## Key Features

### Frontend Development
- **Inventory Web**
  - Displays a list of inventory items, including item names, quantities, categories, and supplier information.
  - Color-coded stock level indicators (red for low stock, green for sufficient stock) for each item.
  
- **Inventory Item Management**
  - Forms for adding, updating, and deleting inventory items.
  - Fields include item name, quantity, category, and supplier.

- **Supplier Information**
  - Supplier management section to add and edit suppliers.
  - Displays basic supplier information, including name, contact details, and items supplied.

### Backend Development
- **Inventory Management API**
  - CRUD endpoints for managing inventory items (add, update, delete).
  - Endpoints for handling supplier information, linking each item to a supplier.

- **Bulk Export/Import**
  - CSV export feature to download all inventory data.
  - CSV import feature for uploading and updating multiple inventory items in bulk.

- **Low Stock Alerts**
  - Alert system that marks items as "low stock" when quantities fall below a specified threshold.

## Technologies Used
- **Frontend**: React, Axios, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **CSV Handling**: PapaParse for frontend CSV parsing and csv-parser for backend CSV handling

## License
This project is licensed under the MIT License. 
