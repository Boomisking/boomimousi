# Expense Tracker Backend

## How to Run

1. Open a terminal and navigate to the backend folder:
   
   ```powershell
   cd backend
   ```

2. Install dependencies (if not already done):
   
   ```powershell
   npm install
   ```

3. Start the backend server:
   
   ```powershell
   npm start
   ```

The server will run at http://localhost:4000

## API Endpoints

- `GET /api/expenses` — List all expenses
- `POST /api/expenses` — Add a new expense (JSON body)
- `PUT /api/expenses/:id` — Update an expense
- `DELETE /api/expenses/:id` — Delete an expense

> This backend uses in-memory storage. Data will reset when the server restarts. For production, connect to a database.
