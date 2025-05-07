import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import "../styles/form.css";
import { Button, FloatingLabel } from "react-bootstrap";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  age: yup.number().positive().integer().required("Age is required"),
  gender: yup.string(),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^\d{10}$/, "Phone must be a 10-digit number").required("Phone is required"),
});

function RegistrationForm({ db, onPatientAdded }: { db: any; onPatientAdded: () => void }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    await db.exec(`
      INSERT INTO patientsDetails (firstName, lastName, age, gender, email, phone) 
      VALUES ('${data.firstName}', '${data.lastName}', ${data.age}, '${data.gender}', '${data.email}', '${data.phone}');
    `);
    
    onPatientAdded();
    reset(); // Clears the form fields after submission
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      
      <FloatingLabel controlId="firstName" label="First Name" className="mb-3">
        <Form.Control {...register("firstName")} type="text" placeholder="Enter First Name" />
        <small>{errors.firstName?.message}</small>
      </FloatingLabel>

      <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
        <Form.Control {...register("lastName")} type="text" placeholder="Enter Last Name" />
        <small>{errors.lastName?.message}</small>
      </FloatingLabel>

      <FloatingLabel controlId="age" label="Age" className="mb-3">
        <Form.Control {...register("age")} type="number" placeholder="Enter Age" />
        <small>{errors.age?.message}</small>
      </FloatingLabel>
      
      <FloatingLabel controlId="gender" label="Gender" className="mb-3">
        <Form.Select aria-label="Default select gender" {...register("gender")}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </Form.Select>
      </FloatingLabel>

     <FloatingLabel controlId="email" label="Email" className="mb-3">
        <Form.Control {...register("email")} type="email" placeholder="Enter Email" />
        <small>{errors.email?.message}</small>
      </FloatingLabel>

      <FloatingLabel controlId="phone" label="Phone" className="mb-3">
        <Form.Control {...register("phone")} type="tel" placeholder="Phone (10-digits)" />
        <small>{errors.phone?.message}</small>
      </FloatingLabel>

      <div className="d-flex justify-content-center">
        <Button  variant="primary" type="submit">Register</Button>
      </div>
    </Form>
  );
}

export default RegistrationForm;
