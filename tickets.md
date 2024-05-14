1. Ticket: Crear interfaz de usuario para añadir candidato
   - Crear un botón o enlace en la página principal del dashboard del reclutador para añadir un nuevo candidato.
   - Diseñar e implementar un formulario que incluya los campos necesarios para capturar la información del candidato (nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral).
   - Implementar validaciones en el formulario para asegurar que los datos ingresados son completos y correctos.
   - Añadir la funcionalidad para cargar el CV del candidato en formato PDF o DOCX.
   - Mostrar un mensaje de confirmación cuando el candidato haya sido añadido exitosamente al sistema.

2. Ticket: Desarrollar API para procesar información del candidato
   - Crear un endpoint en Express para recibir la información del candidato desde el formulario.
   - Validar y sanitizar los datos recibidos en el backend.
   - Almacenar la información del candidato en la base de datos.
   - Generar una respuesta adecuada para informar al frontend sobre el resultado de la operación.

3. Ticket: Implementar manejo de errores y excepciones
   - Capturar y manejar adecuadamente los errores que puedan ocurrir durante el proceso de añadir un candidato, tanto en el frontend como en el backend.
   - Mostrar mensajes de error informativos al usuario en caso de fallos en la conexión con el servidor u otros problemas.

4. Ticket: Asegurar accesibilidad y compatibilidad
   - Realizar pruebas de accesibilidad en la interfaz de usuario para garantizar que sea usable por personas con discapacidades.
   - Verificar la compatibilidad del formulario y la funcionalidad en diferentes dispositivos y navegadores web.

5. Ticket: Mejorar la experiencia del usuario
   - Considerar la implementación de funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.
   - Realizar pruebas de usabilidad para identificar y solucionar cualquier problema en la experiencia del usuario.

6. Ticket: Garantizar la seguridad y privacidad de los datos
   - Implementar medidas de seguridad adecuadas para proteger la información del candidato, tanto en tránsito como en almacenamiento.
   - Asegurar que solo los usuarios autorizados (reclutadores) puedan acceder y manipular los datos de los candidatos.
