import { useEffect, useState } from "react";
import { setupDatabase } from "./database/database";
import RegistrationForm from "./components/registration-form";
import PatientList from "./components/patient-list";
import { PGlite } from "@electric-sql/pglite";
import "./App.css";
import Header from "./components/header";

function App() {
  const [db, setDb] = useState<PGlite>();
  const [refresh, setRefresh] = useState(false); // To refresh updates
  const [hasPatients, setHasPatients] = useState(false); // To check whether data exists

  const checkData = async () => {
    if (db) {
      const result = await db.exec("SELECT COUNT(*) AS count FROM patientsDetails;");
      setHasPatients(result[0].rows[0]?.count > 0);
    }
  };
  
  useEffect(() => {
    async function initDB() {
      const database = await setupDatabase();
      setDb(database);
    }
    initDB();
  }, []);

  useEffect(() => {
    checkData();
  }, [db, refresh]);

  return db ? (
    <>
    <Header/>
    <div className="container col-6">
    <div className="row justify-content-center align-items-center mt-5 pt-5">      
      <h2 id="form">Registration Form</h2>
      <RegistrationForm db={db} onPatientAdded={() => {setRefresh(!refresh); checkData();}} />
      {hasPatients && (
        <>
        <h2 id="details" className="mt-5">Registered Patients</h2>
        <PatientList db={db} key={refresh ? 1: 0} onPatientDeleted={() => { setRefresh(!refresh); checkData(); }} />
        </>
      )}
    </div>
    </div>
    </>
  ) : (
    <p>Loading App...</p>
    
  );
  
}

export default App;
