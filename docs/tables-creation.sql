CREATE TABLE Candidates (
    candidate_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    address TEXT
);

CREATE TABLE Education (
    education_id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL,
    institution_name VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
);

CREATE TABLE WorkExperience (
    experience_id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    start_date DATE,
    end_date DATE,
    description TEXT,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
);

CREATE TABLE Documents (
    document_id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL,
    document_type VARCHAR(50),
    document_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
);