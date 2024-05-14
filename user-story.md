# Añadir Candidato al Sistema

**Como** reclutador,  
**Quiero** tener la capacidad de añadir candidatos al sistema ATS,  
**Para que pueda** gestionar sus datos y procesos de selección de manera eficiente.

### Criterios de Aceptación:

1. Accesibilidad de la función: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.
2. Formulario de ingreso de datos: Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
3. Validación de datos: El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.
4. Carga de documentos: El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.
5. Confirmación de añadido: Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.
6. Errores y manejo de excepciones: En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.
7. Accesibilidad y compatibilidad: La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.

### Notas:

- La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.
- Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.

### Tareas Técnicas:

- Implementar la interfaz de usuario para el formulario de añadir candidato.
- Desarrollar el backend necesario para procesar la información ingresada en el formulario.
- Asegurar la seguridad y privacidad de los datos del candidato.



## Tickets

### Ticket 1: Frontend - Interfaz de Usuario para Añadir Candidato
***Descripción***:  
Desarrollar la interfaz de usuario para permitir a los reclutadores añadir candidatos al sistema. Esto incluye la creación de una página principal para el dashboard y un formulario detallado para ingresar los datos del candidato.  
***Tareas***:
1. Diseñar y desarrollar la página principal del dashboard del reclutador, incluyendo un botón claramente visible para añadir nuevos candidatos.
2. Crear un formulario con los siguientes campos:
    - Nombre: Campo de texto (obligatorio).
    - Apellido: Campo de texto (obligatorio).
    - Correo electrónico: Campo de texto con validación de formato (obligatorio).
    - Teléfono: Campo de texto con validación de formato (opcional).
    - Dirección: Campo de texto (opcional).
    - Educación: Campo de texto o selector con opción de autocompletado (opcional).
    - Experiencia laboral: Área de texto o múltiples campos de texto para detallar experiencias previas (opcional).
3. Implementar validaciones en el formulario para asegurar la integridad de los datos, como verificar que los campos obligatorios no estén vacíos y que el correo electrónico tenga un formato válido.
4. Añadir funcionalidad para cargar documentos, permitiendo al reclutador subir el CV del candidato en formato PDF o DOCX.
5. Desarrollar mensajes de confirmación de éxito y manejo de errores en la interfaz para mejorar la experiencia del usuario.
Tecnologías Sugeridas:
React.js, Redux para manejo de estado, Axios para llamadas API, Bootstrap o Material-UI para componentes de UI.



### Ticket 2: Backend - API para Gestión de Candidatos
***Descripción***:

Desarrollar los servicios backend necesarios para procesar la información de los candidatos ingresada a través del formulario del frontend, incluyendo validaciones detalladas para asegurar la calidad de los datos.

***Tareas***:
1. Crear endpoints de API para añadir y validar la información del candidato. Los datos a recibir y procesar incluyen:
- Nombre (obligatorio): Cadena de texto.
Apellido (obligatorio): Cadena de texto.
Correo electrónico (obligatorio): Cadena de texto, debe ser validado para asegurar que cumple con el formato de correo electrónico.
Teléfono (opcional): Cadena de texto, debe ser validado para asegurar que cumple con un formato de número telefónico adecuado.
Dirección (opcional): Cadena de texto.
Educación (opcional): Cadena de texto o lista de cadenas si se incluyen múltiples titulaciones o cursos.
Experiencia laboral (opcional): Texto largo o lista de descripciones de experiencias previas.
1. Implementar lógica para almacenar la información del candidato en la base de datos.
2. Desarrollar la lógica para la carga y almacenamiento de archivos (CVs), asegurando que solo se acepten formatos PDF o DOCX.
3. Asegurar la seguridad de la API mediante autenticación y autorización.
4. Implementar validaciones detalladas:
Asegurar que los campos obligatorios no estén vacíos.
Validar el formato del correo electrónico y del teléfono.
Implementar límites de tamaño para los campos de texto para prevenir sobrecargas de datos.
1. Implementar manejo adecuado de errores y excepciones, proporcionando mensajes claros y útiles para los desarrolladores y usuarios finales en caso de problemas.
Tecnologías Sugeridas:
Node.js con Express, JWT para autenticación, Multer para manejo de archivos, Sequelize o Mongoose como ORM.


### Ticket 3: Base de Datos - Esquema para Candidatos (Revisado)
***Descripción***:

Diseñar y configurar el esquema de la base de datos para almacenar los datos de los candidatos y sus documentos asociados, utilizando un diagrama de modelo de datos en PlantUML para visualizar las relaciones y estructuras.

***Tareas***:
1. Crear un modelo de datos en PlantUML que incluya las siguientes entidades y sus relaciones:
Candidato
Educación
Experiencia Laboral
Documento (CV)
2. Definir los tipos de datos para cada campo en las entidades:
   - Candidato:
        - id: INT (autoincremental, clave primaria)
        - nombre: VARCHAR(255)
        - apellido: VARCHAR(255)
        - correo_electronico: VARCHAR(255)
        - telefono: VARCHAR(15) (opcional)
        - direccion: VARCHAR(255) (opcional)
   - Educación:
        - id: INT (autoincremental, clave primaria)
        - candidato_id: INT (clave foránea de Candidato)
        - institucion: VARCHAR(255)
        - titulo: VARCHAR(255)
        - fecha_inicio: DATE
        - fecha_fin: DATE (opcional)
   - Experiencia Laboral:
        - id: INT (autoincremental, clave primaria)
        - candidato_id: INT (clave foránea de Candidato)
        - empresa: VARCHAR(255)
        - titulo: VARCHAR(255)
        - descripcion: TEXT
        - fecha_inicio: DATE
        - fecha_fin: DATE (opcional)
   - Documento (CV):
        - id: INT (autoincremental, clave primaria)
        - candidato_id: INT (clave foránea de Candidato)
        - tipo_documento: VARCHAR(50) (ej. "PDF", "DOCX")
        - ruta_archivo: VARCHAR(255)
1. Implementar índices para optimizar las consultas, especialmente en los campos correo_electronico de Candidato y candidato_id en las tablas relacionadas.
2. Asegurar la integridad de los datos con restricciones y validaciones a nivel de base de datos.
Diagrama PlantUML:
    ```
    @**startuml**
    entity "Candidato" {
    * id : INT
    --
    * nombre : VARCHAR(255)
    * apellido : VARCHAR(255)
    * correo_electronico : VARCHAR(255)
    telefono : VARCHAR(15)
    direccion : VARCHAR(255)
    }

    entity "Educación" {
    * id : INT
    --
    * candidato_id : INT
    * institucion : VARCHAR(255)
    * titulo : VARCHAR(255)
    * fecha_inicio : DATE
    fecha_fin : DATE
    }

    entity "Experiencia Laboral" {
    * id : INT
    --
    * candidato_id : INT
    * empresa : VARCHAR(255)
    * titulo : VARCHAR(255)
    * descripcion : TEXT
    * fecha_inicio : DATE
    fecha_fin : DATE
    }

    entity "Documento (CV)" {
    * id : INT
    --
    * candidato_id : INT
    * tipo_documento : VARCHAR(50)
    * ruta_archivo : VARCHAR(255)
    }

    Candidato ||--o{ Educación
    Candidato ||--o{ Experiencia Laboral
    Candidato ||--o{ Documento (CV)
    @**enduml**
    ```