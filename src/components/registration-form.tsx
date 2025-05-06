import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="firstName"> First Name:</label>
      <input type="text" {...register("firstName")} placeholder=" Enter First Name" />
      <p>{errors.firstName?.message}</p>

      <label htmlFor="lastName">Last Name:</label>
      <input type="text" {...register("lastName")} placeholder="Enter Last Name" />
      <p>{errors.lastName?.message}</p>

      <label htmlFor="age">Age:</label>
      <input {...register("age")} type="number" placeholder="Enter Age" />
      <p>{errors.age?.message}</p>

      <label htmlFor="gender">Gender:</label>
      <select {...register("gender")}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="email">Email:</label>
      <input {...register("email")} type="email" placeholder="Enter Email" />
      <p>{errors.email?.message}</p>

      <label htmlFor="phone">Phone:</label>
      <input type="tel" {...register("phone")} placeholder="Phone (10-digit)" />
      <p>{errors.phone?.message}</p>

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
