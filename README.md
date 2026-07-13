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

- AI-powered OCR
- Face Verification
- Passive Liveness Detection
- Fraud Detection
- Digital Attestations
- Multi-Tenant Organization Management
- REST APIs
- JWT Authentication
- Audit Logs

## Technology Stack

Backend
- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- PostgreSQL
- Flyway

AI
- Python
- FastAPI
- YOLO
- OpenCV
- Tesseract OCR

Frontend
- React
- TypeScript

Infrastructure
- Docker
- GitHub Actions

## Team

- Panashe Sibanda — Backend
- Sakhengomusa Ndlovu — Backend
-  Mena Alice — DevOps
- Gashirai Mlambo — Frontend
- Tadiwa Chawatama — Frontend


## Status

🚧 Active Development
