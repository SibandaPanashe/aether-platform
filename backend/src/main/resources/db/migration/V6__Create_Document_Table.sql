CREATE TABLE IF NOT EXISTS documents (
                                         id VARCHAR(36) PRIMARY KEY,
    citizen_id VARCHAR(36) NOT NULL,
    document_type VARCHAR(30) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'UPLOADED',
    file_path VARCHAR(500) NOT NULL,
    original_file_name VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(100),
    document_number VARCHAR(50),
    expiry_date DATE,
    rejection_reason VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (citizen_id) REFERENCES citizens(id) ON DELETE CASCADE
    );

CREATE INDEX IF NOT EXISTS idx_documents_citizen_id ON documents(citizen_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_document_type ON documents(document_type);