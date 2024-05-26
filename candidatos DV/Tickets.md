# Tickets de trabajo

**Ticket 1: Interfaz de Usuario para Añadir Candidato**

**Descripción:**

Desarrollar una interfaz de usuario en React para añadir candidatos. Esta interfaz incluirá un botón en el dashboard principal y un formulario modal para ingresar los datos del candidato.

**Subtareas:**

- Crear un botón en el dashboard del reclutador para abrir el formulario de añadir candidato.
- Diseñar y desarrollar el formulario modal que incluya los campos: nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
- Implementar validaciones en el formulario para asegurar que los datos ingresados sean completos y correctos.
- Añadir la opción para cargar documentos como el CV en formatos PDF o DOCX.

**Criterios de Aceptación:**

- El botón para añadir candidatos es claramente visible en el dashboard.
- El formulario valida correctamente los datos y no permite enviar el formulario si hay errores.
- Mensajes de confirmación y error adecuados se muestran al usuario.

### Ticket 2: Backend para Procesamiento de Datos del Candidato

**Descripción:**

Desarrollar los endpoints y la lógica en el backend usando Express para manejar la creación de nuevos candidatos en la base de datos.

**Subtareas:**

- Crear un endpoint POST para añadir nuevos candidatos.
- Validar los datos del lado del servidor antes de insertarlos en la base de datos.
- Manejar la carga del archivo CV y almacenarlo adecuadamente.
- Implementar manejo de errores y excepciones adecuado para informar al frontend.

**Criterios de Aceptación:**

- El endpoint acepta y procesa correctamente los datos del formulario.
- Los errores y excepciones son manejados y comunicados al frontend.

### Ticket 3: Seguridad y Privacidad de los Datos

**Descripción:**

Asegurar que los datos del candidato son manejados de manera segura y que la aplicación cumple con las normativas de privacidad aplicables.

**Subtareas:**

- Implementar medidas de seguridad para la transmisión de datos (por ejemplo, HTTPS).
- Asegurar que los datos sensibles están adecuadamente protegidos en la base de datos.
- Revisar y aplicar las políticas de privacidad necesarias en el manejo de datos personales.

**Criterios de Aceptación:**

- Los datos se transmiten de manera segura.
- Los datos sensibles están adecuadamente encriptados o protegidos.
- Cumplimiento con las normativas de privacidad.