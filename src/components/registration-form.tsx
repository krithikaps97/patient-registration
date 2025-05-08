import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import "../styles/form.css";
import { Button, FloatingLabel } from "react-bootstrap";
import { useEffect } from "react";

const validationSchema = yup.object().shape({
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  age: yup.number().typeError("Age is required").positive().integer().max(100, 'Enter a valid age').required("Age is required"),
  gender: yup.string(),
  email: yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email address").email("Invalid email format").required("Email is required"),
  phone: yup.string().matches(/^\d{10}$/, "Phone must be a 10-digit number").required("Phone is required"),
});

function RegistrationForm({ db, onPatientAdded, patient=null }: { db: any; onPatientAdded: () => void;patient:any; }) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    defaultValues: patient || { firstname: "", lastname: "", age: "", email: "", phone: "", gender: ""},
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (patient) {
      Object.keys(patient).forEach(key => setValue(key, patient[key]));
    }
  }, [patient]);

  const onSubmit = async (data: any) => {
    if (patient) {
      await db.exec(`UPDATE patientsDetails SET firstname='${data.firstname}', lastname='${data.lastname}', age=${data.age}, gender='${data.gender}', email='${data.email}', phone='${data.phone}' WHERE id=${patient.id};`);
    } else {
      const id = Math.floor(Math.random() * 1000000);
        await db.exec(`
          INSERT INTO patientsDetails (id, firstname, lastname, age, gender, email, phone) 
          VALUES ('${id}','${data.firstname}', '${data.lastname}', ${data.age}, '${data.gender}', '${data.email}', '${data.phone}');
        `);
      }
    onPatientAdded();
    reset(); // Clears the form fields after submission
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      
      <FloatingLabel controlId="firstname" label="First Name" className="mb-3">
        <Form.Control {...register("firstname")} type="text" placeholder="Enter First Name" />
        {errors.firstname?.message && <small>{String(errors.firstname.message)}</small>}
      </FloatingLabel>

      <FloatingLabel controlId="lastname" label="Last Name" className="mb-3">
        <Form.Control {...register("lastname")} type="text" placeholder="Enter Last Name" />
        {errors.lastname?.message && <small>{String(errors.lastname.message)}</small>}
      </FloatingLabel>

      <FloatingLabel controlId="age" label="Age" className="mb-3">
        <Form.Control {...register("age")} type="number" placeholder="Enter Age" />
        {errors.age?.message && <small>{String(errors.age.message)}</small>}

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
        {errors.email?.message && <small>{String(errors.email.message)}</small>}

      </FloatingLabel>

      <FloatingLabel controlId="phone" label="Phone" className="mb-3">
        <Form.Control {...register("phone")} type="tel" maxLength={10} placeholder="Phone (10-digit)" />
        {errors.phone?.message && <small>{String(errors.phone.message)}</small>}

      </FloatingLabel>

      <div className="d-flex justify-content-center">
        <Button  variant="primary" type="submit">{patient ? 'Save' : 'Register'}</Button>
      </div>
    </Form>
  );
}

export default RegistrationForm;
