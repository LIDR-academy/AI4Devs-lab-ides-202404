```mermaid
erDiagram
    candidate {
        string id PK
        string first_name
        string last_name
        string email
        string phone
        string address
    }

    education {
        string id PK
        string candidate_id FK
        string institution
        string degree
        date start_date
        date end_date
    }

    work_experience {
        string id PK
        string candidate_id FK
        string company
        string position
        date start_date
        date end_date
    }

    document {
        string id PK
        string candidate_id FK
        string type
        string url
    }

    candidate ||--o{ education : has
    candidate ||--o{ work_experience : has
    candidate ||--o{ document : has
```