export async function refreshPatients(db: any, setPatients: (patients: any[]) => void) {
    try {
      const result = await db.query("SELECT * FROM patientsDetails ORDER BY id DESC;");
      setPatients(result.rows);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }
  