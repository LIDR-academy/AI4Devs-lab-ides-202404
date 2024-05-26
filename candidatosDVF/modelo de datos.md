mermaid
erDiagram
    Candidato {
        int id PK "Clave primaria"
        varchar firstName "Nombre del candidato"
        varchar lastName "Apellido del candidato"
        varchar email "Correo electrónico"
        varchar phone "Teléfono"
        varchar address "Dirección"
        varchar dni "Documento Nacional de Identidad"
        varchar cvPath "Ruta del archivo CV"
    }

    Educacion {
        int id PK "Clave primaria"
        int candidatoId FK "Clave foránea de Candidato"
        varchar school "Escuela"
        varchar degree "Grado"
        varchar fieldOfStudy "Campo de estudio"
        date startDate "Fecha de inicio"
        date endDate "Fecha de fin"
    }

    ExperienciaLaboral {
        int id PK "Clave primaria"
        int candidatoId FK "Clave foránea de Candidato"
        varchar companyName "Nombre de la empresa"
        varchar position "Posición"
        date startDate "Fecha de inicio"
        date endDate "Fecha de fin"
        text description "Descripción"
    }

    Candidato ||--o{ Educacion : "tiene"
    Candidato ||--o{ ExperienciaLaboral : "tiene"