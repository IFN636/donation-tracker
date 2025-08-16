# Full-Stack CRUD Application Development with DevOps Practices

**Assessment 1 (Total Marks: 20)**

This project demonstrates a full-stack CRUD application built with Node.js, React.js, and MongoDB, implementing industry best practices including project management, version control, and CI/CD deployment.

---

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [Project Setup Instructions](#project-setup-instructions)
-   [Live Application](#live-application)
-   [Project Management](#project-management)
-   [CI/CD Pipeline](#cicd-pipeline)
-   [Architecture](#architecture)

---

## Project Overview

This application extends a starter authentication project to include comprehensive CRUD operations for [Your Chosen Application Type]. The project follows software engineering best practices including:

-   **Project Management with JIRA**
-   **System Modeling with SysML** (Requirement Diagram, Block Definition Diagram, Parametric Diagram)
-   **Version Control with GitHub**
-   **CI/CD Integration for Automated Deployment**

**Base Project:** [https://github.com/rajuiit/sdlapps](https://github.com/rajuiit/sdlapps)

---

## Features

-   ✅ User Authentication & Authorization (JWT)
-   ✅ CRUD Operations for [Feature 1]
-   ✅ CRUD Operations for [Feature 2]
-   ✅ CRUD Operations for [Feature 3]
-   ✅ Responsive Frontend Interface
-   ✅ RESTful API Backend
-   ✅ MongoDB Database Integration
-   ✅ Automated CI/CD Pipeline
-   ✅ AWS Cloud Deployment

---

## Technology Stack

**Frontend:**

-   React.js
-   HTML5/CSS3
-   JavaScript (ES6+)

**Backend:**

-   Node.js
-   Express.js
-   MongoDB
-   JWT Authentication

**Online Payment Integration:**

-   Stripe API Sandbox

**Testing Credit Cards (Stripe):**

-   Visa: `4242 4242 4242 4242`
-   Visa (debit): `4000 0566 5566 5556`
-   Mastercard: `5555 5555 5555 4444`
-   American Express: `3782 8224 6310 005`
-   Declined Card: `4000 0000 0000 0002`
-   CVC: Any 3 digits (4 for Amex)
-   Expiry: Any future date

**DevOps:**

-   GitHub Actions (CI/CD)
-   AWS EC2 (Backend Deployment)
-   AWS S3/CloudFront (Frontend Deployment)

**Project Management:**

-   JIRA
-   SysML Diagrams

---

## Project Setup Instructions

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (local or Atlas)
-   Git
-   AWS Account (for deployment)

### Local Development Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/khangdev20/donation-tracker.git
    cd ./donation-tracker
    ```

2. **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory: ⚠️Serect Keys here are only for testing

    ```env
    MONGO_URI=mongodb+srv://lenhutkhangvo:mongodbpassword@ifn636-qut.vuzlwj6.mongodb.net/donation-tracker?retryWrites=true&w=majority&appName=ifn636-qut
    JWT_SECRET=2J8zqkP7VN6bxzg+Wy7DQZsd3Yx8mF3Bl0kch6HYtFs=
    BLOB_READ_WRITE_TOKEN=vercel_blob_rw_AqdIitkxZXaMO31W_nlgGg8mr2zuc2alUVNKbGTC3ckacRh
    STRIPE_SECRET_KEY=sk_test_51Qq3GpQejYquv8g2ofjABASW3PoOIg3v0DQnEoLVOa31Lj8ATfQP5XJReR7zduFhXnAOL6RZ6rtRDS23W8PPbO2700OTerfU0J
    STRIPE_WEBHOOK_SECRET=whsec_NFlGB7kqv21VjSdPCncwDamrwNGZmCwK
    CLIENT_URL=http://localhost:3000
    PORT=5001
    ```

4. **Database Setup**

    - Install MongoDB locally or use MongoDB Atlas
    - Update the `MONGODB_URI` in your `.env` file

5. **Packages Installation**

    ```bash
    npm run install-all
    ```

6. **Start Backend and Frontend Concurrently**

    ```bash
    npm start
    for development
    npm run dev
    ```

7. **Access the Application**
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:5001`

### Production Deployment

The application is automatically deployed via GitHub Actions CI/CD pipeline when changes are pushed to the main branch.

---

## Live Application

🌐 **Public URL:** http://3.24.15.154/

### Test Credentials

For assessment and demonstration purposes, you can use the following credentials:

**Username:** `testing1@example.com`  
**Password:** `Testing@123`

_Note: These are test credentials created specifically for assessment purposes._

---

## Project Management

### JIRA Board

**JIRA Project URL:** [Your JIRA Board URL]

The project is organized into:

-   **Epics:** Major feature groups
-   **User Stories:** Individual features and requirements
-   **Subtasks:** Detailed development tasks
-   **Sprints:** Organized development cycles

### SysML Diagrams

-   Requirements Diagram
-   Block Definition Diagram (BDD)
-   Parametric Diagram

## CI/CD Pipeline

The project implements automated CI/CD using GitHub Actions:

1. **Continuous Integration:**

    - Automated testing on pull requests
    - Code quality checks
    - Build verification

2. **Continuous Deployment:**
    - Backend deployment to AWS EC2
    - Frontend deployment to AWS S3/CloudFront
    - Environment-specific configurations

**Pipeline Status:** [![CI/CD Pipeline](https://github.com/[username]/[repository]/workflows/CI-CD/badge.svg)](https://github.com/[username]/[repository]/actions)

---

## Architecture
