
import RegistrationForm from "./registration-form";
import type { Patient } from "./patient-list";
import { Modal } from "react-bootstrap";
import { refreshPatients } from "../common/refresh";
import { useState } from "react";

function ModalPatientForm({ db, patient, onClose }: { db: any; patient: Patient | null; onClose: () => void }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const fetchPatients = () => refreshPatients(db, setPatients);
  console.log(patients);
  return (
    <Modal show={!!patient} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegistrationForm db={db} onPatientAdded={()=>{fetchPatients();onClose();}} patient={patient} />
      </Modal.Body>
    </Modal>
  );
}

  
  export default ModalPatientForm;