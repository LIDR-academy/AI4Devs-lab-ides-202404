***IDE***: Cursor

## Prompts

### Prompts Tickets

1.  ***Prompt***
    
    Quiero que actues como un arquitecto del software experimentado para definir 3 tickets de trabajo para un proyecto de desarrollo de software, el cual es un sistema ATS para la empresa LTI. Los tickets deben dividirse en 3 partes, una para el frontend, otra para el backend y otra para la base de datos. Empecemos con la historia de usuario @user-story.md 

    Notas: Tener en cuenta que el software es un sistema nuevo y no se ha realizado ningun desarrollo previo, solo se tiene la estructura de carpetas y archivos.

2. ***Prompt***
   
   Para el Ticket 1 añade:
   - Se debe crear una pagina principal para el dashboard
   - Detallar todos los campos que se necesitan en el formulario

3. ***Prompt***
   
   Para el Ticket 2 añade:
   - Detalles sobre los datos que tendrá que recibir y procesar el endpoint (Detallar los campos)
   - Detallar validaciones que se deben realizar

   
4. ***Prompt***

    Para el Ticket 3:
   - Crear todo el modelo de datos en plantuml, tener en cuenta todas las entidades necesarias par que el sistema funcione
   - Detallar los tipo de datos para cada campo 



### Prompts dev

1. ***Prompt***
   
   Teniendo en cuenta el @README.md especificamente la seccion Explicación de Directorios y Archivos genera el respectivo comando para crear las carpetas y archivos faltantes 

2. ***Prompt***
   
   Genera los modelos que se necesitan para crear las tablas definidas en el ticket 3

3. ***Prompt***
   
   Ahora crea un archivo para la respectiva migracion a postgreSQL

4. ***Prompt***

   Perfecto, ahora quiero que actues como un desarrollador full stack experto, especializado en tecnologias como nodejs, reactjs, typescript y postgreSQL. Vamos a implementar los anteriores tickets uno a uno, primero hagamos el ticket 2, el cual se centra en el backend del proyecto. Utilizar los directorios y subdirectorios de @src los cuales son: 
    - `application`: Contiene la lógica de aplicación.
    - `domain`: Contiene los modelos de dominio.
    - `infrastructure`: Contiene código relacionado con la infraestructura.
    - `presentation`: Contiene código relacionado con la capa de presentación.
    - `routes`: Contiene las rutas de la aplicación.
    - `tests`: Contiene las pruebas de la aplicación.

5. ***Prompt***

   Quiero que generes todas las validaciones necesarias que pueda recibir el endpoint de candidatos, para ello utiliza los modelos de dominio que se encuentran en @src/domain/candidate.ts y @src/domain/education.ts y @src/domain/experience.ts y @src/domain/document.ts

6. ***Prompt***
   
   Continuemos con el frontend el cual es una aplicacion creada con la libreria React js con typeScript, quiero que generes todo el codigo para cumplir con el ticket 1. Crea los directorios y archivos necesarios para manejar buenas practicas y codigo escalable.

7. ***Prompt***

   Eres un desarrollador experto, necesito que crees la aplicacion frontend que cumpla con el ticket 1 del archivo @user-story.md. Se debe utilizar react con typeScript y tailwind css para darle un aspecto visual atractivo. Tener en cuenta que el reclutador puede cargar archivos, especificamente el CV del candidato en formato PDF o DOCX.

   Nota: Se fue interactuando con el chat hasta conseguir una interfaz decente aunque no fue la deseada. Es funcional pero falta escalarlo mas para que reciba multiples registros de educacion y experiencia laboral. Se genero varios propts para que la parte visual se comunicara correctamente con el backend, muchas veces perdia el contexto de la conversacion y creaba archivos innecesarios o los creaba y nunca se utilizaron. 

