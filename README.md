# Business Sales Analysis System (AI-Driven)

A professional full-stack Business Analytics dashboard featuring **AI-driven insights** and a **Database Time Machine** (Audit Logging) built on a strictly normalized **BCNF** MySQL schema.

##  Key Features

*   **Executive Dashboard**: Real-time KPI visualization with charts (Recharts).
*   **BCNF Compliance**: Relational database architecture strictly following Boyce-Codd Normal Form to eliminate redundancy.
*   **Database Time Machine**: Automated **MySQL Triggers** that capture every `INSERT`, `UPDATE`, and `DELETE` operation into an audit log.
*   **AI Business Insights**: Integrated **Gemini 2.5 Flash Lite** to analyze audit logs and provide automated strategic recommendations.
*   **Modern UI**: Emerald Green theme built with **React** and **Tailwind CSS**.

---

##  Architecture

*   **Frontend**: React (Vite) + Tailwind CSS + Lucide Icons + Recharts
*   **Backend**: Node.js + Express + Sequelize (ORM)
*   **Database**: MySQL (BCNF Normalized)
*   **AI Integration**: Google Gemini API

---

## Setup & Installation

### 1. Database Setup
*   Open MySQL Workbench.
*   Run the script provided in `database/schema.sql` to create the database, tables, and audit triggers.

### 2. Backend Configuration
*   Navigate to the `/backend` folder.
*   Run `npm install`.
*   Create a `.env.local` file with the following:
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=your_user
    DB_PASS=your_password
    DB_NAME=sales_analysis_db
    GEMINI_API_KEY=your_gemini_key
    ```
*   Start the server: `node server.js`

### 3. Frontend Configuration
*   Navigate to the `/frontend` folder.
*   Run `npm install`.
*   Start the development server: `npm run dev`

---

## Project Structure

```bash
DBMS_DA2/
├── backend/            # Express API & Sequelize Models
│   ├── config/         # Database configuration
│   ├── controllers/    # Business logic
│   ├── models/         # Database schemas
│   └── services/       # AI Integration (Gemini)
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # UI Layout & Sidebar
│   │   ├── pages/      # Dashboard, Logs, AI Insights
│   │   └── services/   # Axios API Client
├── database/           # SQL Schema & Triggers
└── testing.md          # API Testing Documentation
```

---

## License
This project was developed for the DBMS DA2 assignment.

---

