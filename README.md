# AI Financial Scam Detection System (Full-Stack)

A full-stack, AI-based multi-platform financial scam detection prototype for monitoring transactions, UPI activities, AutoPay mandates, and communication streams.

---

## 📂 Project Structure

This project has been split into frontend and backend directories for better separation of concerns and file maintenance:

```text
├── backend/                  # Express.js REST API Server
│   ├── package.json          # Backend dependencies (express, cors, dotenv)
│   └── server.js             # Express API Server logic & Mock Data Store
│
├── frontend/                 # React.js SPA (Vite + Tailwind CSS v4)
│   ├── src/                  # React components & page assets
│   ├── vite.config.ts        # Vite configuration (configured with local proxy)
│   └── package.json          # Frontend dependencies (react, lucide-react, motion)
│
├── package.json              # Root package.json (Orchestrates full-stack development)
└── README.md                 # Project documentation
```

---

## ⚡ Getting Started

### 1. Installation
Run the following commands in the root directory to install all dependencies for both the root orchestrator, frontend, and backend folders:

```bash
# Install root-level packages
npm install

# Install all frontend and backend dependencies in one step
npm run install-all
```

### 2. Running the Development Server
Start both the React development server and the Express API server concurrently with a single command from the root folder:

```bash
npm run dev
```

* **Frontend Dashboard**: Runs at [http://localhost:3000](http://localhost:3000)
* **Backend API Server**: Runs at [http://localhost:5000](http://localhost:5000)

---

## ⚙️ How It Works (API Integration)

1. **Proxy Config**: The frontend is configured with a local proxy in `frontend/vite.config.ts`. Any requests from the React application pointing to `/api/*` are automatically proxied to `http://localhost:5000/api/*` in development mode.
2. **Resilient Client Service**: The frontend api client (`frontend/src/services/mockApiService.ts`) implements a fetch-with-fallback pattern. It first attempts to fetch live data from the backend server. If the backend is offline or unreachable, it falls back to local mock data to prevent UI disruptions.

---

## 🔌 API Reference (Express Backend)

The Express backend serves the following endpoints under `/api`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/security-status` | Retrieves the overall security score and risk level. |
| **GET** | `/api/summary` | Retrieves dashboard summary stats (transaction counts, alert counts). |
| **GET** | `/api/transactions` | Retrieves recent transaction ledger with risk evaluations. |
| **GET** | `/api/scam-alerts` | Retrieves details of identified suspicious activities. |
| **GET** | `/api/upi-activities` | Retrieves UPI Collect calls and QR scan events. |
| **GET** | `/api/autopay-items` | Retrieves active recurring subscription mandates. |
| **GET** | `/api/scam-messages` | Retrieves SMS/WhatsApp communication stream logs. |
| **GET** | `/api/user-profile` | Retrieves typical user behavior metrics and baselines. |

# AI_Finanical_Scame-Detection-1-
