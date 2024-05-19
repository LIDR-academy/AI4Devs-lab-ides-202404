import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import NavBar from "../layout/NavBar";
import { createCandidate } from "../../services/candidateService";

const CreateCandidate: React.FC = () => {
  const navigate = useNavigate(); // Add this line to instantiate useNavigate

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    workExperience: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    education: "",
    workExperience: "",
  });

  const firstInputRef = useRef<HTMLInputElement>(null); // Crear la referencia

  useEffect(() => {
    // Retrasar ligeramente el enfoque para asegurar que el DOM esté listo
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100); // 100 milisegundos de retraso
  }, []);

  const validate = () => {
    let tempErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      education: "",
      workExperience: "",
    };
    let isValid = true;

    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First name is required.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
      tempErrors.firstName = "First name can only contain letters and spaces.";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last name is required.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {
      tempErrors.lastName = "Last name can only contain letters and spaces.";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email must be a valid email address.";
      isValid = false;
    }

    if (!formData.phone) {
      tempErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      tempErrors.phone = "Phone number can only contain numbers.";
      isValid = false;
    }

    if (formData.address.length > 200) {
      tempErrors.address = "Address can not exceed 200 characters.";
      isValid = false;
    }

    if (!formData.education.trim()) {
      tempErrors.education = "Education is required.";
      isValid = false;
    }

    if (!formData.workExperience.trim()) {
      tempErrors.workExperience = "Work experience is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Permitir solo dígitos numéricos
      const filteredValue = value.replace(/[^0-9]/g, "");
      setFormData({
        ...formData,
        [name]: filteredValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const result = createCandidate(formData);
      console.log("Success:", result);
      navigate("/Candidates");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Create candidate</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName}</p>
          )}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone}</p>
          )}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address}</p>
          )}
          <textarea
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.education && (
            <p className="text-red-500 text-xs">{errors.education}</p>
          )}
          <textarea
            name="workExperience"
            placeholder="Work Experience"
            value={formData.workExperience}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          {errors.workExperience && (
            <p className="text-red-500 text-xs">{errors.workExperience}</p>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCandidate;
