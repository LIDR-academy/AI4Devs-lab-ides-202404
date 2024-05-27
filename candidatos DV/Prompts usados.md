# Prompts usados

Proyecto desarrollado en cursor 

**Historias de usuario**

Eres un experto desarrollador Fullstack senior con conocimientos en React y Express, a partir de la historia de usuario que te comparto, podrías generar los tickets de trabajo?

**Modelo de datos**

Implementa ahora el modelo datos, teniendo en cuenta que estara alojado en MYSQL. A partir del archivo de historia de usuario y los tickets generados, podrías generar el modelo de datos en formato mermaid?

Podrias generar el archivo.sql de ese modelo de datos ?

**Implementación de Tickets**

Podrías  sugerirme como quedaría  la estructura de carpetas y archivos para el FrontEnd, teniendo en cuenta el la definición  del **Ticket 1 (Interfaz de Usuario para Añadir Candidato)**

Crea un botón en el dashboard del reclutador para abrir el formulario de añadir candidato.

Implementa el formulario modal que incluya los campos: nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.

revisemos ahora las validaciones en el formulario para asegurar que los datos ingresados sean completos y correctos.Tener en cuenta que el formulario no se puede procesar si todos los campos no estan validados

Agregar ahora la opción para cargar documentos como el CV en formatos PDF o DOCX.

Vamos hora a trabajar en el Ticket 2 relacionado con el Backend en express. Que estructura de carpetas me puedes sugerir para estructurar en mi entorno de desarrollo

Definamos las configuraciones del servidor y de la base de datos

Implementemos los controladores para manejar la lógica de negocio

Requiero ahora crear endpoint POST para añadir nuevos candidatos.

Define la validación de los datos del lado del servidor antes de insertarlos en la base de datos.

Ahora configuremos el archivo server.js para finalizar la configuración de express y podamos probar el registro de datos del candidato para cargar del archivo CV y almacenarlo adecuadamente.

Implementa el manejo de errores y excepciones adecuado para informar al frontend.

Me gustaria almacenar en un localstorage los estudios y la experiencia laboral del candidato. Esto para garantizar que los datos no se envien null a la base de datos. Incluye una alerta de confirmacion cuando se registren estos dos item del formulario. Recuerda que cuando se haga el envio de todos los datos del candidato, los parametros almacenados en el localstorage seran enviados a las tablas en MYSQL, antes no