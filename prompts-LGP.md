## PROMPTS

### Definición de tickets

- Prompt: @AI4Devs-lab-ides quiero que actues como un arquitecto del software experimentado para definir 3 tickets: desarrollo back, desarrollo front y modelado de la base de datos para este proyecto. Vamos a empezar con esta historia de usuario Añadir Candidato al Sistema

- Prompt: Para el ticket 1 quiero que añadas más detalles sobre los datos que tendrá que recibir y procesar el endpoint, detallando los campos y el tipo de datos válidos para cada uno de ellos

- Prompt: Para el ticket 2 quiero que añadas que se debe crear una página principal para el dashboard del reclutador, donde debe haber un botón visible para añadir un nuevo candidato. Detalla tambien todos los campos y sus tipos que habría que añadir al formulario basándote en los detalles proporcionados en el ticket 1

- Prompt: Para el ticket 3 quiero que detalles los tipos de datos para cada campo y me muestres un modelo de datos en plantuml, teniendo en cuenta que el candidato puede cargar uno o más CV en PDF o DOCx


*Creo los tickets detallados en Trello https://trello.com/b/QWY6fD2K/ats*


### Código

- Prompt: @README.md basándote en las indicaciones del readme Explicación de Directorios y Archivos quiero que generes el comando para poder crear los directorios y ficheros que faltan en el proyecto @AI4Devs-lab-ides 

- Prompt: @.gitignore añade los directorios necesarios de /backend y /frontend

#### Base de datos

- Prompt: @backend teniendo en cuenta que usaremos PostgreSQL para la base de datos, cómo podremos crear el fichero de migracion para este proyecto?

- Prompt: genera los modelos que necesitamos para crear las 4 tablas definidas en el ticket 3 

*Nota: generó bien los modelos de Prisma pero tuve dificultades y tuve que intercambiar para prompts indicandole errores hasta conseguir ejecutar la migración correctamente para generar las tablas en PostgreSQL*


### Backend

- Prompt: teniendo en cuenta que el backend es una aplicación Express escrita en TypeScript que sigue los principios de la arquitectura de software limpia y que ya tenemos definida la estructura de directorios en @src. Quiero que actues como un backend senior que sigue buenas prácticas para generar el código para el endpoint definido en el ticket 1

- Prompt: quiero que agregues todas las validaciones para los datos que puede recibir ese endpoint *(le paso el listado de los campos y sus tipos de datos)*

- Prompt: quiero que generes el codigo para el guardado en base de datos, ten en cuenta que estamos usando postgresql y que tienes el modelo de datos en @schema.prisma

- Prompt: @candidateService.ts ten en cuenta que el usuario puede subir uno a más cvs en formato pdf o docx, tenemos que implementar esto tambien, puedes ver el modelo de datos en @schema.prisma 

- Prompt: @codebase vamos a cambiar la logica, creo que tiene más sentido tener un endpoint para subir ficheros, ese endpoint devolverá el filepath y el filetype que será lo que indiquemos en el endpoint /candidates

*Nota: para conseguir tener funcionando el endpoint guardando a los candidatos en base de datos en las diferentes tablas he tenido que intercambiar varios prompts para corregir errores hasta tener algo funcional*

- Prompt: quiero que actues como un backend senior developer para crear un test para probar el endpoint /candidates teniendo en cuenta que es una aplicación Express escrita en TypeScript

- Prompt: @candidateController.test.ts  revisa los datos que se envian al endpoint, tienes más información de los datos en @validator.ts 

*Nota: con el test he tenido bastantes problemas, había un error que no era capaz de solucionar ni con chat normal ni en modo intérprete. Finalmente opté por preguntar de forma global por cómo solucionar el error y luego pasarle esa información al modo intérprete para que aplicara la solución propuesta*

- Prompt: @Codebase como desarrollador back experto, quiero que documentes la API de /backend usando el standar OpenAPI para describir y documentar esta API restful. Quiero que proporciones una descripción clara de cada endpoint y documentes los parámetros de solicitud y respuesta, tienes más informacion en @validator.ts

### Frontend

- Prompt: @Codebase Teniendo en cuenta que el frontend es una aplicación React y sus archivos principales están ubicados en el directorio src, el directorio public contiene activos estáticos y el directorio build contiene la construcción de producción de la aplicación, quiero que actues como un desarrollador front senior que sigue buenas practicas para generar el código para el front definido en este ticket. Quiero que tengas en cuenta la documentacion de la API para saber como enviar los datos para subir ficheros y crear candidatos, tienes la informacion en @api-spec.yaml 


- Prompt: ten en cuenta que en el formulario de creacion del candidato tenemos la posibilidad de subir un cv. Primero tendremos que subir el fichero usando el endpoint http://localhost:3010/upload que aceptará un campo "file" con un fichero tipo PDF o DOCx. Quiero que tengas en cuenta la documentacion de la API para saber como enviar los datos para subir ficheros y crear candidatos, tienes la informacion en @api-spec.yaml 


- Prompt: @AddCandidateForm.js teniendo en cuenta que el componente para poder subir un fichero podremos usarlo en otras partes de la aplicacion, quiero que lo extraigas de este form y que crees un componente independiente que incluiremos luego en este


- Prompt: quiero que tanto el dashboard como el formulario para añadir candidatos muestre una interfaz atractiva y que sea compatible con todos los dispositivos, tanto moviles como desktops. 

