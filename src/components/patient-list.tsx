import { useEffect, useState } from "react";
import "../styles/patient-list.css";
import { Button, }from "react-bootstrap";
import ModalPatientForm from "./modal";
import { refreshPatients } from "../common/refresh";

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
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  

  const fetchPatients = () => refreshPatients(db, setPatients);
  useEffect(() => {
    fetchPatients();
  }, [db]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete patient ${id}?`);
    
    if (confirmDelete) {
      await db.exec(`DELETE FROM patientsDetails WHERE id = ${id};`);
      onPatientDeleted();
    }
    ;
  };

  const handleEdit = (patient: any) => {
    setSelectedPatient(patient);
  };
  
  
  
  return (
    <>
    <table>
      <thead>
        <tr>
          <th>ID</th>
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
            <td className="d-flex">
             <Button className="me-2" variant="outline-warning" onClick={() => handleEdit(p)}>Edit</Button>
             <Button variant="outline-danger" onClick={() => handleDelete(p.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {selectedPatient && (
      <ModalPatientForm db={db} patient={selectedPatient} onClose={() => {setSelectedPatient(null);fetchPatients()}} />
    )}
    </>
    
  );
}

export default PatientList;