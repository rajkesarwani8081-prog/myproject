# Real-time Phishing Detection System

A local demo with a React + Vite frontend and a Node.js + Express backend. The backend analyzes sample emails using transparent heuristic rules and a **simulated ML score**. It does not connect to a real mail server or use a trained machine-learning model.

## Requirements
- Node.js 18+ (Node.js 20+ recommended)
- VS Code

## Folder structure
```text
phishing-detection-system/
├── backend/
│   ├── src/
│   │   ├── data/sampleEmails.js
│   │   ├── services/detector.js
│   │   ├── routes/scan.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── Pipeline.jsx
│   │   │   ├── EmailList.jsx
│   │   │   ├── LogsPanel.jsx
│   │   │   └── EmailDetails.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json
└── README.md
```

## Run in VS Code
1. Extract this ZIP file.
2. Open the **phishing-detection-system** folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:
   ```bash
   npm run install:all
   ```
5. Start the frontend and backend together:
   ```bash
   npm run dev
   ```
6. Open the URL printed by Vite, normally `http://localhost:5173`.

Backend health check: `http://localhost:5000/api/health`

## How the demo works
- **Send Test Email** asks the backend to analyze a randomly selected sample email.
- **Start Auto-Scan** repeats scans every 3 seconds.
- Click a processed email to see its score, reasons, and extracted features.
- The backend assigns a status: `quarantined` (score ≥ 0.70), `flagged` (score ≥ 0.40), or `delivered` (lower score).

## Important limitations
This is a prototype/demo. The score called “ML” is simulated, not a trained or validated model. It does not inspect real inboxes, receive SMTP mail, quarantine messages in a mail server, or validate detection performance on real-world data. Do not use it as a production security filter without real model training, testing, and mail-server integration.
