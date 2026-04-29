# Backend - Item Manager Lab Test

## Setup
1. Open a terminal inside the backend folder.
2. Run:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`
4. Set `MONGO_URI`:
   - Local MongoDB: `mongodb://127.0.0.1:27017/item-manager`
   - MongoDB Atlas: paste your real connection string from Atlas
5. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `GET /api/items`
- `GET /api/items/:id`
- `POST /api/items`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`
