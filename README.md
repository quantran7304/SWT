# SWT – Software Testing Labs

This repository contains practical laboratory exercises for the **Software Testing (SWT)** course at FPT University.

Each lab is organized in a separate folder under the `Labs/` directory and focuses on different testing techniques and practices.

---

## 📁 Repository Structure

```
SWT/
└─ Labs/
   ├─ Lab2_UnitTest
   └─ DemoCalculator
```

---

## 🧪 Implemented Labs

### 🔹 Lab 2 – Unit Test for Account Registration
- Technology: **Java, Maven, JUnit 5**
- Focus:
  - Unit testing
  - Parameterized tests
  - CSV data-driven testing
- Business rules tested:
  - Username validation
  - Password validation
  - Email format validation

📂 Location:
Labs/Lab2_UnitTest

### 🔹 Lab 3 – Static Testing & Unit Testing for Insurance Claim System
- Technology: **Java, Maven, JUnit 5**
- Focus:
  - Static testing (code review)
  - Identifying defects without executing code
  - Correcting coding logic and coding standard issues
  - Unit testing using GIVEN – WHEN – THEN pattern
- Main activities:
  - Code review and defect identification following ISTQB principles
  - Fixing business logic and coding standard issues
  - Designing test cases and bug reports
  - Writing unit tests for core business logic
- Business rules tested:
  - Claim status transitions (Pending → Approved / Rejected)
  - Claim amount validation
  - Payout calculation (85% for approved claims)
  - Restricting claim updates after approval

📂 Location:  
`Labs/Lab3`

---

## ⚙️ Technologies Used
- Java 17
- Maven
- JUnit 5
- IntelliJ IDEA
- Git & GitHub

---

## ▶️ How to Run Tests
Navigate to a lab folder (e.g. Lab2) and run:

```bash
mvn test

