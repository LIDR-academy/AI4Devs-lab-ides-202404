## Prompts usando modelo gpt-3.5
### Prompt inicial
Estamos trabajando en el proyecto LTI el el cual es un producto Applicant-Tracking System.

### Prompt contexto del proyecto tecnicamente
El proyecto se divide en frontend y backend, el frontend es react y el backend esta en typescript con prisma.
Tenemos un esquema inicial de trabajo en los siguientes directorios @frontend y @backend.
La primera tarea es agregar la primera historia de usuario al sistema.
Para esto nuestra metodología de trabajo va a ser basada en DDD y en TDD. 

### Prompt contexto de la tarea e inicio de esquema de diseño
User:
Esta es la primera historia de usuario que hay que trabajar:

Añadir Candidato al Sistema
Como reclutador,
Quiero tener la capacidad de añadir candidatos al sistema ATS,
Para que pueda gestionar sus datos y procesos de selección de manera eficiente.

Criterios de Aceptación:

Accesibilidad de la función: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.
Formulario de ingreso de datos: Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
Validación de datos: El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.
Carga de documentos: El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.
Confirmación de añadido: Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.
Errores y manejo de excepciones: En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.
Accesibilidad y compatibilidad: La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.

Primero realiza el analisis de DDD identificando los agregados, el caso de uso y el contrato del respositorio.
Con este analisis genera los ficheros pertinentes  para alidir dentro del src del backend.

Chat:
Para la historia de usuario "Añadir Candidato al Sistema" utilizando DDD, podemos identificar lo siguiente:
Agregados:
Candidato: Representa la entidad principal que se añadirá al sistema.
Reclutador: Podría ser otro agregado si se requiere gestionar la interacción del reclutador con los candidatos.
Caso de Uso:
Añadir Candidato: Permite al reclutador agregar un nuevo candidato al sistema ATS.
Contrato del Repositorio:
Interfaz del Repositorio de Candidatos:
addCandidate(candidateData: Candidate): Promise<Candidate>: Agrega un nuevo candidato al sistema.
validateCandidateData(candidateData: Candidate): Promise<boolean>: Valida los datos del candidato antes de agregarlo.
Estructura de Archivos a Crear en el Backend:
Agregados:
src/domain/candidate.ts: Definición de la entidad Candidato.
src/domain/recruiter.ts: Definición de la entidad Reclutador (si es necesario).
Caso de Uso:
src/application/addCandidate.ts: Implementación del caso de uso para añadir un candidato.
Repositorio:
src/infrastructure/repositories/candidateRepository.ts: Implementación del repositorio para el agregado Candidato.
Servicios (si es necesario):
src/applicationServices/validateCandidateService.ts: Servicio para validar los datos del candidato.
Estos archivos representarían la estructura básica para implementar la funcionalidad de añadir un candidato al sistema ATS siguiendo los principios de DDD.
Genera un script en bash para ccrear los ficheros.

USED
Puedes utilizar el siguiente script en bash para crear los archivos mencionados anteriormente en la estructura de carpetas del backend:
"
Este script creará la estructura de carpetas y los archivos necesarios para implementar la funcionalidad de añadir un candidato al sistema ATS siguiendo la estructura propuesta. Puedes ejecutar este script en la raíz de tu proyecto backend para generar los archivos de manera automatizada.

### Prompts de generación de código en backend

User:
Empezemos con el dominio.
Genera el código del fichero @candidate.ts 

User:
Genera el código del fichero @recruiter.ts 

User:
Dentro del dominio se agregó el fichero @repository.ts
Genera la interfaz de contrato para el repositorio.

User:
Ahora genera la implementación de la interfaz @repository.ts.
En esta implementación se almacenará el candidate, realiza esta implementación utilizando prisma.

User:
En esta solución @candidateRepository.ts  se está haciendo un llamado a prisma.candidate.create(...)
El schema de prisma @schema.prisma no debería actualizarse?

Chat:
Sí, en la implementación de PrismaCandidateRepository se está utilizando prisma.candidate.create(...) para crear un nuevo candidato en la base de datos. Para que esta implementación funcione correctamente, debes asegurarte de que el esquema de Prisma en backend/prisma/schema.prisma esté actualizado con el modelo de Candidate.
Aquí tienes un ejemplo de cómo podrías actualizar el esquema de Prisma para incluir el modelo de Candidate:
"
Al agregar el modelo Candidate al esquema de Prisma, asegúrate de ejecutar el comando npx prisma generate para regenerar los archivos de Prisma y reflejar los cambios en tu código. Esto garantizará que la implementación de PrismaCandidateRepository pueda interactuar correctamente con la base de datos a través de Prisma.

User:
Finalmente en el dominio genera el código para el caso de uso@addCandidate.ts en donde se inyecta por constructor una implementación de la interfaz @repository.ts 

User:
Genera las prueba unitarias para el caso de uso @addCandidate.ts 

User:
¿Como ejecutaria esta prueba unitaria generada @addCandidate.test.ts?
El package.json de la aplicación es el siguiente: @package.json 

User:
Teniendo el caso de uso ya podemos crear el controlador.
Genera el script para crear el fichero del controloador en donde se ejecutará el caso de uso.

User:
Generate the code for @candidateController.ts in which the use case will be called.

User:
Add the route on the app server @index.ts  to the controller created @candidateController.ts 

User:
Generate the json body for the POST /candidates request

User:
The app is returning an error with prisma on@candidateRepository.ts 
You are an expert developing apis with typscript and prisma, please solve the error The table `public.Candidate` does not exist in the current database. Is comming from the prisma.candidate.create

Chat:
The error "The table public.Candidate does not exist in the current database" indicates that the table for the Candidate model does not exist in the database. This error commonly occurs when the database schema defined in Prisma is not in sync with the actual database schema.
To resolve this issue, you can follow these steps:
1. Migrate the Database: Run the following Prisma command to apply any pending migrations and update the database schema:
   npx prisma migrate dev
2. Generate Prisma Client: Regenerate the Prisma client to reflect the updated database schema by running:
generate
3. Check Database Connection: Ensure that your database connection is correctly configured in your .env file and that the database specified in the connection URL exists and is accessible.
4. Check Prisma Schema: Double-check your Prisma schema file (schema.prisma) to ensure that the Candidate model is defined correctly and matches the database schema.
5. Re-run the Application: After performing the above steps, restart your application to see if the error is resolved.
By following these steps, you should be able to synchronize the database schema with the Prisma schema and resolve the error related to the missing Candidate table in the database.

### Prompts de generación de código en frontend

User:
Ok, ahora iniciemos con el frontend.
Primero genera la estrategia de estructura de archivos, para el front tambien se utilizará DDD y TDD.
La primera funcionalidad es 'Añadir Candidato al Sistema' pero tenemos que tener en cuenta para empezar que va a ser un sistema completo de Applicant-Tracking System.
Como resultado genera un script en bash para generar las carpetas sin comentarios.

User:
Empezemos con el primer criterio de aceptación:
Accesibilidad de la función: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.

Genera el código que cumpla con este criterio e incluye el nombre y el path del fichero en donde va.

User:
Este componente no es alcanzable para @App.tsx 
Genera los archivos para realizar un sistema de enrutamiento, y la vista en donde se ubica el botón.

User:
We are getting the error: Module '"react-router-dom"' has no exported member 'Switch'.ts(2305)
on @AppRouter.tsx 

User:
El error sigue ocurriendo

## Cambio a uso de modelo gpt-4o
User:
@AppRouter.tsx está teniendo muchos errores, Swith no se encuentra en la ultima version de react-router-dom, Route exact tampoco existe.
Genera la estrategia de rutas nuevamente

Chat:
Para la última versión de react-router-dom (v6 y posteriores), la API ha cambiado significativamente. En lugar de Switch, se utiliza Routes, y en lugar de component, se utiliza element. Aquí tienes la estrategia de rutas actualizada para react-router-dom v6:
1. Actualizar AppRouter.tsx:

User:
Ok, ahora genera todos los ficheros necesarios para realizar el llamado al backend una vez se le de submit al formulario

User:
Se está obteniendo el famoso problema de CORS al llamar /candidates
Access to XMLHttpRequest at 'http://localhost:3010/candidates' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

Chat:
Para resolver el problema de CORS, necesitas configurar tu servidor backend para permitir solicitudes desde el origen de tu frontend. Puedes hacerlo utilizando el middleware cors en tu servidor Express.
Aquí tienes cómo puedes configurar CORS en tu servidor backend:
1. Instalar el Middleware cors:
   npm install cors
2. Configurar CORS en tu Servidor Express:
...

User:
Se está obteniendo error debido a que falta el cvUrl. En este momento no haremos el feature de subir el archivo, pero podemos añadirlo como parte del formulario.
Actualiza el fromulario en el front para poder crear el candidate.

User:
Finalmente cuando el candidato sea creado exitosamente muestra un mensaje de confirmación al usuario, y cierra el formulario.