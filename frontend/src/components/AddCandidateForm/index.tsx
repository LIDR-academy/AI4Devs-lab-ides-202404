import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    degree: string;
    institution: string;
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    cv: File | null;
}

interface AddCandidateFormProps {
    onSubmit: () => void;
  }

export const AddCandidateForm = ({ onSubmit }: AddCandidateFormProps) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        degree: '',
        institution: '',
        position: '',
        company: '',
        startDate: '',
        endDate: '',
        cv: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        setFormData({
            ...formData,
            cv: e.target.files[0],
        });
        }
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const cvContent = formData.cv ? await fileToBase64(formData.cv) : '';
            const response = await axios.post('http://localhost:3010/api/candidates', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                education: [{
                    degree: formData.degree,
                    institution: formData.institution
                }],
                workExperience: [{
                    position: formData.position,
                    company: formData.company,
                    startDate: new Date(formData.startDate).toISOString(),
                    endDate: new Date(formData.endDate).toISOString()
                }],
                documents: [{
                    name: formData.cv?.name,
                    content: cvContent
                }]
            });
            console.log(response.data);
            onSubmit();
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <section className="p-4">
            <h2>Datos Personales</h2>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
        </section>
        <section className="p-4">
            <h2>Educación</h2>
            <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Degree" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
            <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="Institution" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
        </section>
        <section className="p-4">
            <h2>Experiencia</h2>
            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Start Date" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} placeholder="End Date" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" required />
        </section>
        <input type="file" name="cv" onChange={handleFileChange} accept=".pdf,.docx" className="mt-2" />
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </form>
    );
};
