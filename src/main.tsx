import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PGliteProvider } from '@electric-sql/pglite-react';
import { setupDatabase } from './database/database.ts';

async function init() {
  try {
    const db = await setupDatabase();
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <PGliteProvider db={db}>
          <App />
        </PGliteProvider>
      </StrictMode>,
    );
  } catch (error) {
    console.error("Failed to initialize the database:", error);
  }
}

init();