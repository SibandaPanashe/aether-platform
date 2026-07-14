# Aether Platform — Demo Script
## AI4I Challenge 2026 — Development Track

---

### Duration: 5-7 minutes

---

## Scene 1: The Problem (30 seconds)

**Narrator:**
"Every day in Zimbabwe, citizens present the same identity documents to banks, universities, employers, and government agencies. Each institution verifies independently. Same documents. Same process. Repeated endlessly."

*Show slide with fragmented verification diagram.*

"Aether solves this. Verify once. Trust everywhere."

---

## Scene 2: Citizen Registration (60 seconds)

**Live Demo:**
1. Open citizen portal landing page
2. Click "Get Verified"
3. Register new user (Tafara Moyo)
4. Show glass morphism login card with Parliament background
5. Login and land on dashboard

**Say:**
"A citizen creates an account once. JWT-based authentication with BCrypt-hashed passwords. Role-based access control from day one."

---

## Scene 3: Document Upload (60 seconds)

**Live Demo:**
1. Navigate to "Verify My Identity"
2. Select "National ID"
3. Upload a sample Zimbabwe national ID image
4. Show drag-and-drop upload zone
5. Submit for verification

**Say:**
"The platform accepts Zimbabwe passports and national IDs. Files are stored encrypted in MinIO object storage — never in the database. SHA-256 integrity verification on every upload."

---

## Scene 4: AI Verification (90 seconds)

**Live Demo:**
1. Show backend API call to AI service
2. Display Postman or Swagger showing the verification pipeline:
    - Image quality assessment → Document detection → OCR → Face matching → Liveness
3. Show the verification result JSON

**Say:**
"Behind the scenes, our AI engine performs multi-stage verification. Document detection with YOLOv11. OCR extraction with PaddleOCR plus MRZ checksum validation. Face matching with InsightFace ArcFace embeddings. Passive liveness detection to prevent presentation attacks — no blinking or head-turning required."

*Show architecture diagram.*

"The AI service is a separate FastAPI microservice. The Java backend never performs inference directly. Clean separation of concerns. Each model is independently upgradeable."

---

## Scene 5: Trust Score & Decision (45 seconds)

**Live Demo:**
1. Show the verification result with trust score
2. Display the decision engine output: VERIFIED with 96.8% confidence
3. Show which factors contributed (OCR, MRZ, Face, Liveness)

**Say:**
"Unlike binary pass/fail systems, Aether produces a weighted trust score combining multiple evidence sources. MRZ checksum validation carries the highest weight. Configurable thresholds — a bank can require 95% confidence while a university might accept 85%. All explainable. All auditable."

---

## Scene 6: Organization Verification (60 seconds)

**Live Demo:**
1. Switch to organization portal
2. Login as a bank
3. Navigate to "Verify Credential"
4. Input a credential JWT (or scan mock QR code)
5. Show result: "Verified — Trust Level: HIGH"

**Say:**
"Now the bank verifies the citizen's identity. Notice — the bank never sees the passport image. Never sees the national ID. Only the verification result and trust level. Privacy by design. Minimum disclosure."

---

## Scene 7: Technical Architecture (45 seconds)

**Live Demo:**
1. Show GitHub repository with green CI badge
2. Show 18 passing tests
3. Show docker-compose.yml
4. Show Postman collection

**Say:**
"Production-ready from day one. Clean architecture — controllers, services, repositories. 18 unit tests, all passing. Docker Compose for one-command local setup. GitHub Actions CI/CD. Flyway for database migrations. Postman collection for API testing."

---

## Scene 8: Impact & Roadmap (30 seconds)

**Say:**
"Aether reduces onboarding time from days to minutes. Lower costs for banks. Better privacy for citizens. Stronger fraud protection for everyone."

*Show roadmap slide.*

"Phase 1 — Zimbabwe passports and national IDs. Phase 2 — driver's licenses, mobile SDK. Phase 3 — SADC expansion, W3C Verifiable Credentials."

---

## Closing (15 seconds)

**Say:**
"Aether is not just document verification. It's Africa's trust layer. Built in Zimbabwe. Built for Zimbabwe. Ready to scale."

*Show Aether logo with tagline: "Verify Once. Trust Everywhere."*

---

## Technical Checklist for Demo

- [ ] Local PostgreSQL running
- [ ] Backend started (`mvn spring-boot:run`)
- [ ] AI service started (`uvicorn app.main:app --port 8000`)
- [ ] Citizen portal running (`npm run dev`)
- [ ] Organization portal running (`npm run dev`)
- [ ] Sample ID image ready for upload
- [ ] Postman open for API demonstration
- [ ] GitHub repo open showing CI badge and tests