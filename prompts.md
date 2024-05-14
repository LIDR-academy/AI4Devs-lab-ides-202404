A continuación los prompts usados para generar la documentación de las historias de usuario y tickets de trabajo:

**Prompt 1**
Eres un brillante desarrollador Fullstack Senior con conocimientos en React, Express, Prisma y PostgreSQL. 
Se tiene como punto de partida este proyecto,  el cual consiste en un sistema ATS de Gestión de Candidatos.
Si te indico una historia de usuario con sus respectivos Criterios de aceptación, ¿podrias generar los tickets de trabajo necesarios para lograr el objetivo?

**Prompt 2**
Para poder implementar los tickets identificados de la Historia, se requiere previamente prerarar la base de datos, para ello se requiere un modelo de datos. En la   carpeta @designLTI está el diseño preliminar del sistema, revísalo y genera el modelo de datos que se requiere para la historia 01: "Añadir Candidato al Sistema".

Toma en cuenta que los nombres de las tablas y sus campos, deben ser creados en inglés y en formato snake case. 

El modelo de datos generalo en formato Mermaid

**Prompt 3**
genera los comandos necesarios para implementar el modelo de datos en PostgresSQL y actualiza el @schema.prisma 

**Prompt 4**
los valores de configuracion están definidos en @.env ¿cómo se cargan en el sistema para que @schema.prisma los tenga disponibles?

**Prompt 5**
Genera el código necesario para implementar el Ticket 1:

 Toma en cuenta que la implementacion se requiere con React, usar la librería boostrap, aplicar buenas paracticas de UI/UX.

Como salida se espera:
1. Nombre del archivo con su correspondiente ruta de ubicación y contenido.
2. Comandos que se requieran ejecutar para aplicar los cambios en la aplicación.

**Prompt 6**
@H01.md ahora genera el código necesario para el Ticket 2: 

Carga de Documentos:
Agregar la funcionalidad para que el reclutador pueda cargar el CV del candidato en formato PDF o DOCX.
Asegurar que la carga de documentos sea compatible y segura.

Como salida se espera:

Lista de archivos por modificar o crear con sus correspondientes rutas.


**Prompt 7**
@H01.md ahora genera el código necesario para el Ticket 3: 

Confirmación y Manejo de Errores:
Mostrar un mensaje de confirmación al añadir exitosamente un candidato al sistema.
Implementar el manejo de errores y excepciones para casos como fallos en la conexión con el servidor.

Como salida se espera:

Lista de archivos por modificar o crear con sus correspondientes rutas.

**Prompt 8**
@H01.md genera el código necesario para el Ticket 4: 

Accesibilidad y Compatibilidad:
Garantizar que la funcionalidad sea accesible y compatible con diferentes dispositivos y navegadores web.
Optimizar la interfaz para una experiencia de usuario intuitiva y fácil de usar

Como salida se espera:

Lista de archivos por modificar o crear con sus correspondientes rutas.

**Prompt 9**
@H01.md generar el código backend para el  Ticket 5:

Desarrollar las API necesarias en el backend para procesar la información ingresada en el formulario de añadir candidato.
Implementar la lógica para almacenar los datos del candidato de manera segura y privada.

Se espera como salida la lista de archivos a crear o modificar tanto en en backend como en el frontend con sus correspondientes rutas.

**Prompt 10**
verifica que la implementación del ticket 5 tenga persistencia de los datos usando Prisma, si no la tiene, genera el código e indica los archivos a crear o modificar con sus correspondientes rutas.

**Prompt 11**
Verifica que la implementación del ticket 6 tenga la implementación completa en el backend y en el frontend. Si faltan archivos por modificar o crear, genera el código el indica el nombre del archivo con su correspondiente ruta.

