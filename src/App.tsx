import { useState } from 'react';
import './App.css'
import PatientList from './components/patient-list'
import RegistrationForm from './components/registration-form'
import { usePGlite } from '@electric-sql/pglite-react'

function App() {
  // const [db, setDb] = useState<PGlite>();
  const [refresh, setRefresh] = useState(false); // To refresh updates
  const db = usePGlite();

  return (
    <>
      <div>
        <h1>Patient Registration</h1>
        <h2>Registration Form</h2>
        <RegistrationForm db={db} onPatientAdded={() => setRefresh(!refresh)} />
        <h2>Registered Patients</h2>
        <PatientList db={db} />
      </div>
    </>
  )
}

export default App
