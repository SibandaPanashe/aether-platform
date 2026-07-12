CREATE TABLE IF NOT EXISTS citizens (
                                        id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10),
    national_id_number VARCHAR(50) UNIQUE,
    passport_number VARCHAR(50) UNIQUE,
    driver_license_number VARCHAR(50) UNIQUE,
    phone_number VARCHAR(20),
    email VARCHAR(255),
    address VARCHAR(500),
    verification_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX IF NOT EXISTS idx_citizens_national_id ON citizens(national_id_number);
CREATE INDEX IF NOT EXISTS idx_citizens_passport ON citizens(passport_number);
CREATE INDEX IF NOT EXISTS idx_citizens_driver_license ON citizens(driver_license_number);
CREATE INDEX IF NOT EXISTS idx_citizens_verification_status ON citizens(verification_status);