# MyContacts Fullstack

A contact manager with Node/Express/MongoDB backend and React/Vite frontend.

## Local development

1. Copy environment files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Install dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

3. Start backend and frontend

```bash
npm run dev:backend
npm run dev:frontend
```

4. Visit `http://localhost:5173`


5. Go Live: https://mycontact-fullstack.vercel.app/
## Deployment notes

- The backend uses `process.env.MONGO_URI`.
- Set `PORT` for the backend and `VITE_API_URL` for the frontend when deployed.
- Keep `.env` files private and do not commit them.
