import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PGlite } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import { PGliteProvider } from '@electric-sql/pglite-react';

window.indexedDB.open("patientRegistration");

const db = await PGlite.create({
  extensions: { live },
  dataDir: 'idb://MyTestDatabase'
});

await db.exec(`CREATE TABLE IF NOT EXISTS patientsDetails (
  id SERIAL PRIMARY KEY, 
  firstName TEXT, 
  lastName TEXT, 
  age INTEGER, 
  email TEXT, 
  gender TEXT, 
  phone INTEGER);
`)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PGliteProvider db={ db }>
      <App />
    </PGliteProvider>
  </StrictMode>,
)
