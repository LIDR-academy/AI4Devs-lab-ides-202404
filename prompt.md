# Agregar candidato al sistema ATS
**Herramienta IA:** Cursor con gpt-3.5

## Prompts tickets de trabajo:
**Prompt 1**: Tenemos la siguiente historia de usuario:
<br>
"
#Añadir Candidato al Sistema
Como reclutador, Quiero tener la capacidad de añadir candidatos al sistema ATS, Para que pueda gestionar sus datos y procesos de selección de manera eficiente.

##Criterios de Aceptación:

* **Accesibilidad de la función**: Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.
* **Formulario de ingreso de datos**: Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.
* **Validación de datos**: El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.
* **Carga de documentos**: El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.
* **Confirmación de añadido**: Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.
* **Errores y manejo de excepciones**: En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.
* **Accesibilidad y compatibilidad**: La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.

##Notas:

* La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.
* Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.

##Tareas Técnicas:

* Implementar la interfaz de usuario para el formulario de añadir candidato.
* Desarrollar el backend necesario para procesar la información ingresada en el formulario.
* Asegurar la seguridad y privacidad de los datos del candidato.
"

**Prompt 2**: Genérame el detalle de los tres tickets de trabajo teniendo en cuenta la siguiente estructura:
<br>
"
**1. Título Claro y Conciso**

Un resumen breve que refleje la esencia de la tarea. Debe ser lo suficientemente descriptivo para que cualquier miembro del equipo entienda rápidamente de qué se trata el ticket.

**2. Descripción Detallada**

- **Propósito:** Explicación de por qué es necesaria la tarea y qué problema resuelve.
- **Detalles Específicos:** Información adicional sobre requerimientos específicos, restricciones, o condiciones necesarias para la realización de la tarea.

**3. Criterios de Aceptación**

- **Expectativas Claras:** Lista detallada de condiciones que deben cumplirse para que el trabajo en el ticket se considere completado.
- **Pruebas de Validación:** Pasos o pruebas específicas que se deben realizar para verificar que la tarea se ha completado correctamente.

**4. Prioridad**

- **Nivel de Urgencia:** Una clasificación de la importancia y la urgencia de la tarea, lo cual ayuda a determinar el orden en que deben ser abordadas las tareas dentro del backlog.

**5. Estimación de Esfuerzo**

- **Puntos de Historia o Tiempo Estimado:** Una evaluación del tiempo o esfuerzo que se espera que tome completar el ticket. Esto es esencial para la planificación y gestión del tiempo del equipo.

**6. Asignación**

- **Responsable:** Quién o qué equipo será responsable de completar la tarea. Esto asegura que todos los involucrados entiendan quién está a cargo de cada parte del proyecto.

**7. Etiquetas o Tags**

- **Categorización:** Etiquetas que ayudan a clasificar el ticket por tipo (bug, mejora, tarea, etc.), por características del producto (UI, backend, etc.), o por sprint/versión.

**8. Comentarios y Notas**

- **Colaboración:** Espacio para que los miembros del equipo agreguen información relevante, hagan preguntas, o proporcionen actualizaciones sobre el progreso de la tarea.

**9. Enlaces o Referencias**

- **Documentación Relacionada:** Enlaces a documentos, diseños, especificaciones o tickets relacionados que proporcionen contexto adicional o información necesaria para la ejecución de la tarea.

**10. Historial de Cambios**

- **Rastreo de Modificaciones:** Un registro de todos los cambios realizados en el ticket, incluyendo actualizaciones de estado, reasignaciones y modificaciones en los detalles o prioridades.
". Haz las suposiciones que consideres necesarias en cuanto a la prioridad y el nivel de esfuerzo. Justifícame la elección de cada una de las suposiciones

**Prompt 3**: Cuáles serían las tareas básicas a desarrollar primero, antes de comenzar con los tres tickets de trabajo?. Ten en cuenta que ya tenemos bien definida la historia de usuario, la configuración del entorno de desarrollo, la arquitectura y el repositorio

## Prompts Backend:
**Prompt 1**: Bien, toma como contexto la carpeta @backend donde se encuentra la configuración básica. Dame el detalle del código para desarrollar el modelo de datos. Establece las entidades, atributos y relaciones necesarias para cumplir con los requerimientos de la historia de usuario

**Prompt 2**: Dame el código del diagrama entidad-relación teniendo en cuenta el modelo de datos. Utiliza el formato mermaid

**Prompt 3**: Esos son todos los pasos para implementar el modelo de datos usando prisma?, dame el detalle para probar esta funcionalidad

**Prompt 4**: Dame los comandos específicos para probar la creación, consulta, actualización y eliminación de registros haciendo uso de Prisma Client

**Prompt 5**: Al probar el modelo de datos en prisma, solo es posible eliminar un candidato después de haber eliminado manualmente el registro de 'education' y el de 'workExperience'. Cómo se puede eliminar esta información de forma automática? @prisma

**Prompt 6**: Faltó agregar la opción de carga de documentos en el modelo de datos del candidato

**Prompt 7**: Actualízame el diagrama del modelo de datos en formato mermaid

<details>
  <summary>Diagrama Mermaid</summary>

  ```mermaid
      erDiagram
        Candidate {
            int id
            string firstName
            string lastName
            string email
            string phone
            string address
        }
        Education {
            int id
            string degree
            string institution
            int candidateId
        }
        WorkExperience {
            int id
            string position
            string company
            DateTime startDate
            DateTime endDate
            int candidateId
        }
        Document {
            int id
            string name
            string content
            int candidateId
        }

        Candidate ||--o{ Education : "1 to many"
        Candidate ||--o{ WorkExperience : "1 to many"
        Candidate ||--o{ Document : "1 to many"
  ```
</details>
<br>

**Prompt 8**: Bien, vamos a seguir ahora con el punto 2 de nuestras tareas básicas: "Configurar la Validación de Datos". Toma como base el modelo de datos en @schema.prisma y genérame el código necesario para esto. Recuerda que estamos trabajando en la carpeta 'backend' del proyecto. Decide cuál sería la ubicación más adecuada de esta lógica y justifícame la decisión

**Prompt 9**: Bien, vamos a implementar el punto 3 de las tareas básicas: "Establecer la Comunicación Frontend-Backend". Teniendo en cuenta la estructura actual del proyecto y la historia de usuario que debemos implementar, qué opciones de implementación puedes darme que sean escalables y mantenibles?. Recuerda que tenemos el backend y el frontend en dos carpetas diferentes y cada uno tiene un servidor propio

**Prompt 10**: Bien, implementemos una API RESTful haciendo uso del Prisma Client que tenemos. Recuerda el objetivo principal de la historia de usuario. Dame el detalle del paso a paso para lograrlo. No omitas detalles ni asumas nada. Ten en cuenta la estructura actual del proyecto donde el backend está en la carpeta con el mismo nombre y haz uso de buenas prácticas para agregar la lógica de forma modular y que sea escalable

**Prompt 11**: Bien, dame el detalle del código teniendo en cuenta la estructura que me diste en el prompt anterior y para un endpoint de "agregar un candidato a la base de datos"

**Prompt 12**: Dame el detalle de la implementación del middleware de limpieza para cerrar la conexión de Prisma Client

**Prompt 13**: Dame el detalle de cómo probar el endpoint para agregar un candidato

**Prompt 14**: Implementa un middleware de manejo de errores para capturar y responder a errores de forma adecuada en las solicitudes API. Por ejemplo, si el valor de 'phone' es inválido, mostrar el error respectivo. Actualmente se muestra el error genérico 'Error al agregar el candidato', pero no se le da mayor información al usuario

**Prompt 15**: Dame el detalle de cómo integrar el middleware al controlador 'candidateController'

**Prompt 16**: Necesito agregar la información de las entidades 'Document', 'Education' y 'workExperience' automáticamente al momento de crear el candidato

**Prompt 17**: Dame un ejemplo de objeto JSON a enviar en el body para crear un candidato completo. Usa información de Colombia y maneja las fechas en formato ISO-8601 'Datetime'

## Prompts Frontend:
**Prompt 1**: Perfecto, ten presente que el frontend será desarrollado en la carpeta 'frontend'. Para toda la implementación, vas a hacer uso de buenas prácticas de código y herramientas como:

* Código modular basado en componentes
* Componentes dentro de la carpeta 'src' y creando una nueva carpeta 'components'
* Uso de Tailwind como librería de estilos que ya se encuentra instalada y configurada.

Vamos a ir paso a paso probando las funcionalidades para garantizar que al final todo funcione bien.

Antes de comenzar, dame el detalle del paso a paso que vas a seguir para la implementación

**Prompt 2**: Debe haber una página principal tipo dashboard donde el reclutador pueda ir al formulario para añadir un nuevo candidato. Para definir estas rutas vas a usar React Router v6.

Vuelve a darme el detalle del paso a paso que vas a seguir para la implementación teniendo en cuenta esta información que te acabo de dar

**Prompt 3**: Perfecto, el punto 1 ya esta hecho, comencemos a desarrollar el componente del punto 2. Dame **todo** el detalle del código para este componente, no omitas nada, tu eres el responsable de la calidad del código y yo voy simplemente a revisarlo

**Prompt 4**: Recuerda que estamos usando TypeScript. Vuelve a darme el componente refactorizado haciendo uso de esta tecnología

**Prompt 5**: Lo veo bien, ahora necesitamos probar el renderizado. Dame los pasos para lograr esto con el detalle del código. No me refiero a testing sino a cuales serían los siguientes pasos para continuar con la implementación

**Prompt 6**: Listo, ya creé el componente 'Dashboard' que me diste. Siguiendo la estructura del proyecto, qué debería hacer para renderizar este componente? @frontend

**Prompt 7**: Y qué hacemos con el componente App?

**Prompt 8**: Bien, dame una estructura más detallada del componente App agregando estilos de Tailwind. Decide los estilos tu mismo manteniendo la coherencia con los estilos del componente 'AddCandidateForm' que me diste en los prompts anteriores

**Prompt 9**: Debemos corregir un error en el componente 'Dashboard'.  Debe tener un botón para añadir un nuevo candidato. Este botón debe redirigirnos a una nueva página con el componente 'AddCandidateForm'. Debemos entonces implementar React Router v6 y unos componentes de páginas para que esto suceda. Dame el detalle del código para lograrlo

**Prompt 10**: Créame un componente 'Home' que se encargará de renderizar el componente 'Dashboard' en la ruta '/'

**Prompt 11**: Vamos a agregarle funcionalidad al frontend. Para esto, ten en cuenta que tengo un 'backend' en la carpeta del mismo nombre. Ten en cuenta la siguiente información:

* Se ha definido un API endpoint en la ruta 'http://localhost:3010/api/candidates'
* En esa ruta se debe agregar la información del nuevo candidato desde el formulario 'AddCandidateForm'

Dame una versión refactorizada del componente 'AddCandidateForm' para que todo esto sea posible

**Prompt 12**: Revisa el modelo de datos en @schema.prisma y agrega los campos faltantes en el formulario de @index.tsx. Toma también como referencia el siguiente objeto JSON con la información que se debe poder pasar para agregar un nuevo candidato:
```json
"{
  "firstName": "María",
  "lastName": "González",
  "email": "mariagonzalez1@example.com",
  "phone": "+57320 987 6543",
  "address": "Calle 10 #25-30, Bogotá, Colombia",
  "education": [
    {
      "degree": "Ingeniería de Sistemas",
      "institution": "Universidad Nacional de Colombia"
    }
  ],
  "workExperience": [
    {
      "position": "Desarrollador Full Stack",
      "company": "Empresa XYZ",
      "startDate": "2020-01-01T00:00:00Z",
      "endDate": "2021-12-31T23:59:59Z"
    }
  ],
  "documents": [
    {
      "name": "Certificado de Bachillerato",
      "content": "Contenido del certificado"
    }
  ]
}"
```
**Prompt 13**: Haz las siguientes modificaciones al componente:

1. Crea tres secciones dentro del formulario: "datos personales", "educación" y "experiencia"
2. Distribuye los input de la siguiente manera:
   - "firstName", "lastName", "email", "phone" y "address" deben estar en la sección de "datos personales"
   - "degree" y "institution" deben estar en la sección de "educación"
   - "position", "company", "startDate" y "endDate" deben estar en la sección de "experiencia"

Crea los inputs necesarios y faltantes para lograr la estructura indicada

> De aquí en adelante continué con GitHub copilot porque se me terminaron los créditos gratuitos de Cursor con gpt-3.5. Básicamente se hizo lo siguiente:

1. Corregir un error en la estructura del `formData`
2. Agregar soporte para subir archivos en `base64`
3. Modificar el formato de las fechas a `ISO-8601 DateTime`
4. Agregar estilos con TailWind
5. Agregar mensaje de confirmación al enviar la información
6. Revisar compatibilidad con dispositivos y accesibilidad