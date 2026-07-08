CREATE TABLE organizations
(
    id UUID PRIMARY KEY,

    name VARCHAR(150) NOT NULL UNIQUE,

    code VARCHAR(50) NOT NULL UNIQUE,

    email VARCHAR(255),

    phone_number VARCHAR(30),

    address VARCHAR(255),

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users
    ADD COLUMN organization_id UUID;

ALTER TABLE users
    ADD CONSTRAINT fk_users_organization
        FOREIGN KEY (organization_id)
            REFERENCES organizations(id);