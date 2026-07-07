CREATE TABLE system_info (
    id SERIAL PRIMARY KEY,
    version VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO system_info(version)
VALUES ('0.1.0');
