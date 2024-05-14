// AddCandidateForm.js

import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';

const AddCandidateForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const address = formData.get('address') as string;
        const education = formData.get('education') as string;
        const experience = formData.get('experience') as string;
        const cvFile = formData.get('cvFile') as File;

        if (name.trim() === '') {
            setError('Por favor ingresa un nombre válido.');
            return;
        }

        if (lastName.trim() === '') {
            setError('Por favor ingresa un apellido válido.');
            return;
        }

        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            setError('Por favor ingresa un correo electrónico válido.');
            return;
        }

        if (phone.trim() === '') {
            setError('Por favor ingresa un teléfono válido.');
            return;
        }

        if (address.trim() === '') {
            setError('Por favor ingresa una dirección válida.');
            return;
        }

        if (education.trim() === '') {
            setError('Por favor ingresa una educación válida.');
            return;
        }

        if (experience.trim() === '') {
            setError('Por favor ingresa una experiencia laboral válida.');
            return;
        }

        if (!cvFile) {
            setError('Por favor carga tu CV en formato PDF o DOCX.');
            return;
        }

        // Envía los datos al backend
        // Mostrar un mensaje de confirmación al añadir exitosamente un candidato
        // Implementar el manejo de errores y excepciones
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="text" required name="name" />
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Apellido:</Form.Label>
                <Form.Control type="text" required name="lastName" />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Correo electrónico:</Form.Label>
                <Form.Control type="email" required name="email" />
            </Form.Group>
            <Form.Group controlId="phone">
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control type="tel" required name="phone" />
            </Form.Group>
            <Form.Group controlId="address">
                <Form.Label>Dirección:</Form.Label>
                <Form.Control type="text" required name="address" />
            </Form.Group>
            <Form.Group controlId="education">
                <Form.Label>Educación:</Form.Label>
                <Form.Control type="text" required name="education" />
            </Form.Group>
            <Form.Group controlId="experience">
                <Form.Label>Experiencia laboral:</Form.Label>
                <Form.Control type="text" required name="experience" />
            </Form.Group>
            <Form.Group controlId="cvFile">
                <Form.Label>CV:</Form.Label>
                <InputGroup>
                    <FormControl type="file" accept=".pdf, .docx" required name="cvFile" />
                </InputGroup>
            </Form.Group>
            <Button type="submit">Añadir Candidato</Button>
            {error && <Alert variant="danger">{error}</Alert>}
            <Alert variant="success">Candidato añadido exitosamente</Alert>
            {/* Manejo de errores y excepciones */}
        </Form>
    );
}

export default AddCandidateForm;

