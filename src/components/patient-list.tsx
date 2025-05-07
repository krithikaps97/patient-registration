import { useEffect, useState } from "react";
import "../styles/patient-list.css";
import { Button } from "react-bootstrap";

export interface Patient {
  id: number;
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  gender: string;
  phone: string;
}
function PatientList({ db, onPatientDeleted }: { db: any; onPatientDeleted: () => void }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  
  useEffect(() => {
    async function fetchPatients() {
      const result = await db.query("SELECT * FROM patientsDetails ORDER BY id DESC;");
      setPatients(result.rows);
    }
    fetchPatients();
  }, [db]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    
    if (confirmDelete) {
      await db.exec(`DELETE FROM patientsDetails WHERE id = ${id};`);
      onPatientDeleted();
    }
    ;
  };
  
  
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
          <th>Action</th>
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
            <td><Button variant="outline-danger" onClick={() => handleDelete(p.id)}>Delete</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
    
  );
}

export default PatientList;