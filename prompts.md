# Generación de tickets

1. Eres un experto desarrollador Fullstack senior con conocimientos en React y Express, a partir de la historia de usuario que te comparto, podrías generar los tickets de trabajo?

# Generación de modelo de datos y migraciones

1. A partir del archivo de historia de usuario y los tickets generados, podrías generar el modelo de datos en formato mermaid?
2. Los nombres de las entidades pueden quedar en snake case al igual que las propiedades?
3. A partir del modelo de datos generado y el schema de prisma que adjunto, podrías completar el schema de prisma?
4. Te falto hacer el map de las entidades, por ejemplo entre WorkExperience y work_experience
5. Te faltó user

# Implementación de tickets del 1 al 3

1. Para el primer ticket del archivo @tickets.md , podrías generar el código para el frontend y el backend?

### Frontend

1. Podrías agregar el tipo correcto para el parámetro e de las funciones?
2. For the code present, we get this error:

```
Type 'File | null' is not assignable to type 'null'.
  Type 'File' is not assignable to type 'null'.
```

How can I resolve this? If you propose a fix, please make it concise. 3. Podrías agregar la lógica para enviar los datos al backend teniendo en cuenta el endpoint add-candidate del archivo @index.ts?

### Backend

1. En base al archivo @App.tsx podrías generar la lógica para guardar los campos en la base de datos y además guardar el archivo de resume en una carpeta?
2. Podrías solucionar los tipos de edu y exp?
3. Para la línea seleccionada, podrías poner el path en una variable de entorno y agregarla al archivo @.env ?

### Frontend

1. Como puedes ver en @schema.prisma los campos education y work_experience no son textos, por lo tanto, podrías actualizar el archivo @App.tsx para que el formulario tenga en cuenta estas entidades?
2. For the code present, we get this error:

```
Cannot find name 'handleEducationChange'.
```

How can I resolve this? If you propose a fix, please make it concise. 3. For the code present, we get this error:

```
Cannot find name 'handleWorkExperienceChange'.
```

How can I resolve this? If you propose a fix, please make it concise. 4. Acá deberían haber dos botones para añadir educación y experiencia de trabajo dinámicamente 5. Podrías solucionar los problemas con la línea 82 y 91 en el archivo @App.tsx ? 6. Podrías agregarle labels y placeholders a los inputs en @App.tsx ? 7. Si estoy enviando un archivo junto al payload, es correcto que sea application/json? 8. For the code present, we get this error:

```
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ firstName: string; lastName: string; email: string; phone: string; address: string; education: { institution: string; degree: string; start_date: string; end_date: string; }[]; workExperience: { company: string; position: string; start_date: string; end_date: string; }[]; resume: File | null; }'.
  No index signature with a parameter of type 'string' was found on type '{ firstName: string; lastName: string; email: string; phone: string; address: string; education: { institution: string; degree: string; start_date: string; end_date: string; }[]; workExperience: { company: string; position: string; start_date: string; end_date: string; }[]; resume: File | null; }'.
```

How can I resolve this? If you propose a fix, please make it concise.

### Backend

1. Si el request es un multipart/form-data, es correcto leerlo de esta manera en @index.ts ?

### Frontend

1. En el archivo @App.tsx se est'a enviando de forma correcta el archivo? quiero solucionar el error de Boundary

### Backend

1. Ya que el archivo de multer está subido en un directorio, podrías mover el archivo de la carpeta de multer a resumePath y además, podrías obtener la extensión original del archivo y adjuntarla en resumePath?
2. Estoy obteniendo el siguiente error en el front: App.tsx:76

POST http://localhost:3010/add-candidate net::ERR_FAILED 201 (Created)

### General

1. Del ticket 1 en el archivo @tickets.md te faltó el punto 1 en el frontend @App.tsx , el punto 3 en el frontend y en el backend @index.ts , el punto 5 en el frontend y validar si el archivo es solo PDF o DOCX

### Backend

1. Falta la validacion del tipo de archivo en el backend @index.ts
2. Podrías Validar y sanitizar los datos recibidos en el backend?

### Frontend

1. En el archivo @App.tsx podrías Mostrar mensajes de error informativos al usuario en caso de fallos en la conexión con el servidor u otros problemas?
2. Los datos vienen con comillas dobles después de ser validados con express-validator, a qué puede deberse?
3.
