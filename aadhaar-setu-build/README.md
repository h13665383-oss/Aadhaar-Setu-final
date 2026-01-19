# Aadhaar Setu
Full Stack Application with Flask Backend and React Frontend.

## Prerequisites
- Python 3.8+
- Node.js 16+ (only for rebuilding frontend)

## Structure
- `backend/`: Flask application and API.
- `frontend/`: React source code.
- `backend/data/`: CSV Data storage.

## How to Install and Run

1. **Setup Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run Application**
   ```bash
   python app.py
   ```
   The application will be available at `http://localhost:5000`.

3. **Frontend (Optional Re-build)**
   If you want to modify the frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
   This updates the `frontend/dist` directory which Flask serves.

## Data
Data is stored in CSV files in `backend/data/`.
- `users.csv`: User accounts and roles.
- `records.csv`: Transaction records.
- `centres.csv`: Location data.

You can edit these CSV files to manage data.
