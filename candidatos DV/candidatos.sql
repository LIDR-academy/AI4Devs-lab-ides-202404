-- Crear la tabla de Candidatos
CREATE TABLE Candidato (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255)
);

-- Crear la tabla de Educación
CREATE TABLE Educacion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidatoId INT,
    school VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    fieldOfStudy VARCHAR(255),
    startDate DATE,
    endDate DATE,
    FOREIGN KEY (candidatoId) REFERENCES Candidato(id)
);

-- Crear la tabla de Experiencia Laboral
CREATE TABLE ExperienciaLaboral (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidatoId INT,
    companyName VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    startDate DATE,
    endDate DATE,
    description TEXT,
    FOREIGN KEY (candidatoId) REFERENCES Candidato(id)
);