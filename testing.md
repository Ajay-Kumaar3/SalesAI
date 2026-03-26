# Testing and Setup Guide - Business Sales Analysis System

Follow these steps to set up and verify the application.

## 1. Database Setup
1. Open **MySQL Workbench**.
2. Connect to your local MySQL instance.
3. Open the file [schema.sql](file:///c:/Users/Lenovo/OneDrive/Desktop/DBMS_DA2/database/schema.sql).
4. Copy the entire content and paste it into a new SQL Query tab.
5. Execute the script. This will:
   - Create `sales_analysis_db`.
   - Create tables: `Customers`, `Products`, `Orders`, `Order_Items`, `Audit_Log`.
   - Create triggers for automatic logging on INSERT, UPDATE, and DELETE.

## 2. Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   npm install sequelize mysql2 cors @google/generative-ai
   ```
3. Update the `.env` file with your credentials:
   - `DB_USER`, `DB_PASS`, `GEMINI_API_KEY`.
4. Start the server:
   ```bash
   node server.js
   ```

## 3. Step-by-Step Test Flow
### A. Add Data
1. Use an API client (like Postman atau Insomnia).
2. **Add a Customer**
   - **POST** to `http://localhost:5000/api/customers`
   - **Body (JSON)**:
     ```json
     {
       "Name": "John Doe",
       "Email": "john.doe@example.com",
       "Phone": "123-456-7890",
       "Address": "123 Main St, Springfield"
     }
     ```

3. **Add a Product**
   - **POST** to `http://localhost:5000/api/products`
   - **Body (JSON)**:
     ```json
     {
       "Name": "Laptop Pro 15",
       "Description": "High-performance laptop for developers",
       "Price": 1200.00,
       "StockQuantity": 25
     }
     ```

4. **Create an Order**
   - **POST** to `http://localhost:5000/api/orders`
   - **Body (JSON)**:
     ```json
     {
       "CustomerID": 1,
       "items": [
         {
           "ProductID": 1,
           "Quantity": 2,
           "UnitPrice": 1200.00
         }
       ]
     }
     ```

### B. Verify Audit Logs
1. **List all Audit Logs**
   - **GET** to `http://localhost:5000/api/audit-logs`
   - Verify the `INSERT` actions.

2. **Update a Product Price (Trigger Test)**
   - **PUT** to `http://localhost:5000/api/products/1`
   - **Body (JSON)**:
     ```json
     {
       "Price": 1250.00
     }
     ```
   - Check audit logs again to see the `UPDATE` entry.

### C. Generate AI Insights
1. **Generate Insights**
   - **GET** to `http://localhost:5000/api/ai/insights`
   - The system will analyze the audit logs using Gemini and return a summary.

## 4. Expected Outputs
- **Audit Logs**: JSON objects with `old_value` and `new_value` showing the change.
- **AI Insights**: A professional analysis of your transactions and inventory movements.
