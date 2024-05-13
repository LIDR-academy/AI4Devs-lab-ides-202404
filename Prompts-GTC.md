# Enfoque general
Instalé el plugin de GitHub Copilot en Visial Studio y cree los directorios que hacian falta en el repositorio. Intenté pasarle a GitHub Copilot la definición de la HU usando el contexto del workspace del proyecto y pedirle que me ayudara con el primer desarrollo de base de datos y simplemente me contestó que sólo podía ayudarme con tareas de programación. Entonces pasé a ChatGPT-4 para definir los 3 tickes de trabajo. 

Pude generar código para los 3 tickest de trabajo pero no me dió el tiempo para probar la funcionalidad.

## Base de datos

Comencé con el primer ticket de creación de base de datos y se lo pasé como input a GitHub Copilot:

### Prompt:

Necesito crear la tabla Candidates que almacenará la información principal de los candidatos. Aquí está un desglose detallado de cada campo y sus características: Tabla: Candidates id: Un identificador único para cada candidato. Tipo: INTEGER Características: AUTO_INCREMENT, PRIMARY KEY nombre: Primer nombre del candidato. Tipo: VARCHAR Longitud: 255 apellido: Apellido del candidato. Tipo: VARCHAR Longitud: 255 email: Dirección de correo electrónico del candidato. Tipo: VARCHAR Longitud: 255 Debe validarse para garantizar que tiene un formato de correo electrónico apropiado. telefono: Número de teléfono del candidato. Tipo: VARCHAR Longitud: 50 direccion: Dirección residencial del candidato. Tipo: VARCHAR Longitud: 500 cv_url: URL donde está almacenado el CV del candidato, puede ser una ruta a un sistema de almacenamiento de archivos. Tipo: TEXT educacion: Detalles de la educación del candidato, incluyendo institución, grado, fechas de inicio y fin, etc. Tipo: JSON

### GitHub Copilot:

Para crear la tabla Candidates en PostgreSQL, puedes usar el siguiente comando SQL:

CREATE TABLE Candidates (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefono VARCHAR(50),
    direccion VARCHAR(500),
    cv_url TEXT,
    educacion JSON,
    experiencia_laboral JSON
);

Este comando crea una tabla con los campos especificados. El campo id se autoincrementa y se usa como clave primaria. El campo email es único, lo que significa que no puede haber dos candidatos con el mismo correo electrónico. Los campos educacion y experiencia_laboral son de tipo JSON, lo que permite almacenar una estructura de datos flexible.

Por favor, ten en cuenta que este comando debe ser ejecutado en el contexto de la base de datos correcta. Si estás utilizando psql, puedes seleccionar la base de datos con el comando \c nombre_de_la_base_de_datos.

Además, este comando no incluye validaciones adicionales como la validación del formato del correo electrónico. Eso normalmente se manejaría en la capa de la aplicación o mediante una función de disparador en la base de datos.

### Comentario: 
Esta solución no es la apropiada bajo el contexto del proyecto y no lo fue porque no puse el comando de @workspace. Al hacerlo entregó:

### GitHub Copilot

Para crear la tabla Candidates, puedes agregar la siguiente definición de modelo a tu archivo schema.prisma en backend/prisma/schema.prisma:

model Candidate {
  id        Int      @id @default(autoincrement())
  nombre    String   @db.VarChar(255)
  apellido  String   @db.VarChar(255)
  email     String   @db.VarChar(255) @unique
  telefono  String   @db.VarChar(50)
  direccion String   @db.VarChar(500)
  cv_url    String   @db.Text
  educacion Json
}

## Front

Luego pase al Front. Allí ChatGPT-4 me entregó el ticket con varios pasos y comencé a entregárselos a GitHub Copilot uno por uno.

### Prompt:
@workspace Necesito el desarrollo REACT PARA EL Formulario de Añadir Candidato: Crear una nueva página o modal que contenga el formulario para ingresar los datos del candidato. Los campos del formulario deben incluir: Nombre Apellido Correo electrónico Teléfono Dirección Educación (puede ser un conjunto de campos dinámicos para agregar múltiples entradas) Experiencia laboral (similar a educación, permitiendo múltiples entradas) Carga de CV (campo para cargar archivos). Dame el código y dime en qué archivo dentro de mi workspace debería crear ese código

### GitHup Copilot:

Para crear un formulario en React, puedes usar el componente useState para manejar el estado del formulario y useEffect para manejar los efectos secundarios. Aquí tienes un ejemplo de cómo podrías hacerlo:

import React, { useState } from 'react';

const AddCandidateForm = () => {
  const [candidate, setCandidate] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    educacion: [''],
    experiencia: [''],
    cv: null,
  });

  const handleInputChange = (event) => {
    setCandidate({
      ...candidate,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setCandidate({
      ...candidate,
      cv: event.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica de envío del formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={candidate.nombre} onChange={handleInputChange} />
      <input name="apellido" value={candidate.apellido} onChange={handleInputChange} />
      <input name="email" value={candidate.email} onChange={handleInputChange} />
      <input name="telefono" value={candidate.telefono} onChange={handleInputChange} />
      <input name="direccion" value={candidate.direccion} onChange={handleInputChange} />
      {/* Aquí puedes agregar lógica para manejar múltiples campos de educación y experiencia */}
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default AddCandidateForm;
Este código debería ir en un nuevo archivo en el directorio src de tu aplicación frontend. Podrías llamar a este archivo AddCandidateForm.js en el directorio frontend/src. Recuerda que este es solo un ejemplo básico y es posible que necesites ajustarlo para que se adapte a tus necesidades específicas, como la validación de formularios y la manipulación de campos dinámicos para la educación y la experiencia laboral.

### Prompt:

@workspace ahora implementemos en AddCandidateForm.js Implementar validaciones en el frontend para asegurar la calidad de los datos: Campos como email y teléfono deben tener validaciones de formato. Los campos obligatorios no deben estar vacíos. Añadir validaciones específicas para el tamaño y formato de los archivos en el campo de carga de CV.

### GitHup Copilot:

Puedes agregar validaciones a tu formulario en [AddCandidateForm.js]:

import React, { useState } from 'react';

const AddCandidateForm = () => {
  const [candidate, setCandidate] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    educacion: [''],
    experiencia: [''],
    cv: null,
  });

  const handleInputChange = (event) => {
    setCandidate({
      ...candidate,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Validar el tamaño del archivo (menor a 5MB) y el formato (PDF)
    if (file.size > 5000000 || file.type !== 'application/pdf') {
      alert('El archivo debe ser un PDF y menor a 5MB');
      return;
    }
    setCandidate({
      ...candidate,
      cv: file,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar que los campos obligatorios no estén vacíos
    if (!candidate.nombre || !candidate.apellido || !candidate.email || !candidate.telefono) {
      alert('Por favor, rellena todos los campos obligatorios');
      return;
    }
    // Validar el formato del email
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(candidate.email)) {
      alert('Por favor, introduce un email válido');
      return;
    }
    // Validar el formato del teléfono
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(candidate.telefono)) {
      alert('Por favor, introduce un número de teléfono válido');
      return;
    }
    // Aquí puedes manejar la lógica de envío del formulario
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" value={candidate.nombre} onChange={handleInputChange} required />
      <input name="apellido" value={candidate.apellido} onChange={handleInputChange} required />
      <input name="email" value={candidate.email} onChange={handleInputChange} required />
      <input name="telefono" value={candidate.telefono} onChange={handleInputChange} required />
      <input name="direccion" value={candidate.direccion} onChange={handleInputChange} required />
      {/* Aquí puedes agregar lógica para manejar múltiples campos de educación y experiencia */}
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default AddCandidateForm;

Este código agrega validaciones para los campos de email, teléfono y archivo de CV. También asegura que los campos obligatorios no estén vacíos.

## Backend

Luego pasé a el Backend usando la misma estrategia de generar el ticket en ChatGPT y entregarlo por pasos a GitHub Copilot

### Prompt:

@workspace Dame el desarrollo para un Endpoint para Añadir Candidatos. Ruta: /api/candidates, Método: POST, Descripción: Este endpoint recibe los datos del candidato desde el frontend y los almacena en la base de datos. Cuerpo del Request: json Copy code { "nombre": "string", "apellido": "string", "email": "string", "telefono": "string", "direccion": "string", "cv_url": "string", "educacion": [ { "institucion": "string", "grado": "string", "fecha_inicio": "date", "fecha_fin": "date" } ], "experiencia_laboral": [ { "empresa": "string", "titulo": "string", "descripcion": "string", "fecha_inicio": "date", "fecha_fin": "date" } ] }

Dame el código y dime en qué archivo(s) debe ir

### GitHub Copilot:

Para implementar este endpoint, necesitarás un controlador para manejar la lógica de la aplicación y una ruta para manejar las solicitudes HTTP.

Primero, crea un controlador en backend/src/application/controllers/candidateController.ts:

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addCandidate = async (req: Request, res: Response) => {
  const candidateData = req.body;

  try {
    const newCandidate = await prisma.candidate.create({
      data: candidateData,
    });

    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ error: 'Error al añadir candidato' });
  }
};

Luego, crea una ruta en backend/src/routes/candidateRoutes.ts:

import express from 'express';
import { addCandidate } from '../application/controllers/candidateController';

const router = express.Router();

router.post('/api/candidates', addCandidate);

export default router;

Finalmente, necesitarás importar y usar este router en tu archivo backend/src/index.ts:

import express from 'express';
import candidateRouter from './routes/candidateRoutes';

const app = express();

app.use(express.json());
app.use(candidateRouter);

// Resto del código del servidor...

Esto creará un endpoint POST en /api/candidates que usará la función addCandidate para crear un nuevo candidato en la base de datos.


### Prompt:

En este punto GitHub Copilot me sugirió:  "How can I handle errors and validation in the candidate addition endpoint?." lo cual era presisamente el siguiente paso que me había sugerido ChatGPT-4 entonces lo apliqué:

@workspace How can I handle errors and validation in the candidate addition endpoint?

### GitHub Copilot:

To handle errors and validation in the candidate addition endpoint, you can use middleware for validation and error handling. Here's an example of how you can do it:

First, create a middleware function for validation in a new file backend/src/middleware/validation.ts:

import { Request, Response, NextFunction } from 'express';

export const validateCandidate = (req: Request, res: Response, next: NextFunction) => {
    const candidateData = req.body;

    // Add your validation logic here
    // For example, check if all required fields are present
    if (!candidateData.nombre || !candidateData.apellido || !candidateData.email || !candidateData.telefono) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // If everything is fine, proceed to the next middleware or route handler
    next();
};

Then, use this middleware in your route in backend/src/routes/candidateRoutes.ts:

import express from 'express';
import { addCandidate } from '../application/controllers/candidateController';
import { validateCandidate } from '../middleware/validation';

const router = express.Router();

router.post('/api/candidates', validateCandidate, addCandidate);

export default router;

Now, before the addCandidate function is called, the validateCandidate function will check if the request data is valid. If it's not, it will respond with an error and addCandidate won't be called.

For error handling, you already have a try-catch block in your addCandidate function in backend/src/application/controllers/candidateController.ts. If an error occurs while creating a new candidate, the function will respond with a 500 status code and an error message. You can customize this error handling logic as needed.






