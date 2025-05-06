import { useEffect, useState } from "react";
export interface Patient {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  gender: string;
  phone: string;
}
function PatientList({ db }: { db: any }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  // const db = usePGlite();

  useEffect(() => {
    async function fetchPatients() {
      const result = await db.query("SELECT * FROM patientsDetails ORDER BY id DESC;");
      setPatients(result.rows);
    }
    fetchPatients();
  }, [db]);
  return (
    <>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.firstname}</td>
            <td>{p.lastname}</td>
            <td>{p.age}</td>
            <td>{p.gender}</td>
            <td>{p.email}</td>
            <td>{p.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
    
  );
}

export default PatientList;