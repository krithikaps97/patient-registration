import { PGlite } from "@electric-sql/pglite";
import { live } from "@electric-sql/pglite/live";

export async function setupDatabase() {
  window.indexedDB.open("patientRegistrationDB");

    const db = await PGlite.create({
    extensions: { live },
    dataDir: 'idb://patientRegistrationDB'
    });
    

    await db.exec(`CREATE TABLE IF NOT EXISTS patientsDetails (
        id SERIAL PRIMARY KEY, 
        firstName TEXT, 
        lastName TEXT, 
        age INTEGER, 
        email TEXT, 
        gender TEXT, 
        phone BIGINT);
    `)
  return db;
}