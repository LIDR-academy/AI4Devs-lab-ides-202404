## Prompts en lenguaje natural
He terminado los Primeros Pasos. Guiame con el resto de la tarea.

explicame como newbie. nunca he usado prisma. no se el primer paso.

no conozco prisma ni postresql, no se que debo hacer, explica paso a paso

debes indicarme el nombre del fichero y el lugar donde se va a guardar

I think I have to install multer

Te voy a dar especificaciones de User Story para implementar. Tus respuestas requeriran para mi un desarrollo paso a paso como para una persona que no sabe nada pero es capaz de llevar a cabo tus instrucciones de alto nivel para solamente copiar y pegar y de acuerdo a los resultados exitosos o errores interactuar contigo hasta lograr el exito del proyecto. Entendido?


Esta es la historia de usuario que hay que trabajar:

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
Notas:

La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.
Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.
Tareas Técnicas:

Implementar la interfaz de usuario para el formulario de añadir candidato.
Desarrollar el backend necesario para procesar la información ingresada en el formulario.
Asegurar la seguridad y privacidad de los datos del candidato.


Error again: look at the prisma model 
We are sending a PDF, yet field is cvURL

still error.
Data type for receiving the CV is text in the database. it should be a blob or the path to the file in local system

## Prompts de errores
D:\GitHub_Windows\AI4Devs-lab-ides\backend>npx prisma init   

> backend@1.0.0 npx
> prisma init

 ERROR  A folder called prisma already exists in your project.
        Please try again in a project that is not yet using Prisma.


D:\GitHub_Windows\AI4Devs-lab-ides\backend> npx prisma migrate dev --name init

> backend@1.0.0 npx
> prisma migrate dev --name init

Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database

Error: Prisma schema validation - (get-config wasm)
Error code: P1012
error: Environment variable not found: DATABASE_URL.
  -->  schema.prisma:13
   | 
12 |   provider = "postgresql"
13 |   url      = env("DATABASE_URL")
   | 

Validation Error Count: 1
[Context: getConfig]

Prisma CLI Version : 5.13.0



D:\GitHub_Windows\AI4Devs-lab-ides\backend> npx prisma migrate dev --name init

> backend@1.0.0 npx
> prisma migrate dev --name init

Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "LTIdb", schema "public" at "localhost:5432"

Applying migration `20240514040206_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20240514040206_init/
    └─ migration.sql

Your database is now in sync with your schema.

EPERM: operation not permitted, unlink
'D:\GitHub_Windows\AI4Devs-lab-ides\backend\node_modules\.pri
sma\client\query_engine-windows.dll.node'