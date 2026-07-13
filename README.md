# Aether Platform

<div align="center">

**AI-Powered Identity Intelligence Platform**

[![Backend CI](https://github.com/SibandaPanashe/aether-platform/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/SibandaPanashe/aether-platform/actions/workflows/backend-ci.yml)
[![Java 21](https://img.shields.io/badge/Java-21-orange.svg)](https://adoptium.net)
[![Spring Boot 3](https://img.shields.io/badge/Spring%20Boot-3.5-green.svg)](https://spring.io/projects/spring-boot)
[![Python 3.12](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org)
[![License](https://img.shields.io/badge/License-Apache%202.0-lightgrey.svg)](LICENSE)

*Verify Once. Trust Everywhere.*

</div>

---

## Overview

Aether is an AI-powered digital identity verification platform that enables organizations to verify a citizen's identity once and subsequently rely on cryptographically signed digital attestations — eliminating repeated identity verification across banking, insurance, education, government, and telecommunications.

The platform combines computer vision, optical character recognition (OCR), biometric face verification, passive liveness detection, and digital credentials to automate identity verification while preserving privacy.

**Initial Focus:** Zimbabwe passports and national identity cards.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Aether Platform                       │
├───────────────┬──────────────────┬──────────────────────────┤
│    Citizen    │   Organization   │      Admin Dashboard      │
│    Portal     │      Portal      │                           │
│    (React)    │     (React)      │                           │
└───────┬───────┴────────┬─────────┴────────────┬──────────────┘
        │                │                      │
        ▼                ▼                      ▼
┌──────────────────────────────────────────────────────────────┐
│                    Janus API Gateway                          │
└───────────────────────────┬──────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                     ▼
┌──────────────┐    ┌──────────────────┐   ┌──────────────────┐
│   Identity   │    │   Verification   │   │   Organization   │
│   Service    │    │      Service      │   │     Service      │
│ (Spring Boot)│    │  (Spring Boot)    │   │  (Spring Boot)   │
└──────────────┘    └────────┬──────────┘   └──────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   AI Verification    │
                  │   Engine (FastAPI)   │
                  ├──────────────────────┤
                  │ • Document Detection │
                  │ • OCR Extraction     │
                  │ • Face Matching      │
                  │ • Liveness Detection │
                  └──────────────────────┘
```

---

## Features

### Phase 1 — Foundation (Implemented)
- ✅ JWT Authentication (register, login, refresh, logout)
- ✅ Organization Management (CRUD, RBAC)
- ✅ Citizen Profile Management
- ✅ Document Upload & Storage
- ✅ Role-Based Access Control (SUPER_ADMIN, ORGANIZATION_ADMIN, VERIFIER, CITIZEN)

### Phase 2 — AI Verification (In Progress)
- 🔄 Document Detection (YOLOv11)
- 🔄 OCR & MRZ Extraction (PaddleOCR + PassportEye)
- 🔄 Face Matching (InsightFace ArcFace)
- 🔄 Passive Liveness Detection (MiniFASNet)
- 🔄 Trust Score Engine

### Phase 3 — Credentials (Planned)
- ⬜ Digital Attestation (JWT signed with Ed25519)
- ⬜ Credential Verification API
- ⬜ QR Code Verification
- ⬜ Credential Revocation

---

## Tech Stack

| Layer         | Technology                                             |
|---------------|---------------------------------------------------------|
| **Backend**   | Java 21, Spring Boot 3.5, Spring Security, JPA, Flyway  |
| **AI Engine** | Python 3.12, FastAPI, OpenCV, InsightFace, PaddleOCR    |
| **Frontend**  | React 18, TypeScript, Vite                              |
| **Database**  | PostgreSQL 16                                            |
| **Cache**     | Redis                                                    |
| **Storage**   | MinIO (S3-compatible)                                    |
| **Gateway**   | Janus API Gateway (Spring Cloud)                         |
| **Infra**     | Docker, Docker Compose, GitHub Actions                   |

---

## Quick Start

### Prerequisites
- Java 21
- Docker & Docker Compose
- PostgreSQL 16 (or use Docker)
- Python 3.12 (for AI service)

### 1. Clone

```bash
git clone https://github.com/SibandaPanashe/aether-platform.git
cd aether-platform
```

### 2. Configure environment

Copy the example environment file and fill in your local values (database credentials, JWT secret, MinIO keys, etc.):

```bash
cp .env.example .env
```

### 3. Start dependencies with Docker Compose

```bash
docker compose up -d
```

This spins up PostgreSQL, Redis, and MinIO for local development.

### 4. Run the backend services

```bash
./mvnw spring-boot:run
```

### 5. Run the AI verification engine

```bash
cd ai-engine
pip install -r requirements.txt
uvicorn main:app --reload
```

### 6. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

---

## License

Licensed under the Apache 2.0 License. See [LICENSE](LICENSE) for details.