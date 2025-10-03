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

This application extends a starter authentication project to include comprehensive CRUD operations for fundraising campaigns and donations. The project follows software engineering best practices including:

-   **Project Management with JIRA**
-   **System Modeling with SysML** (Requirement Diagram, Block Definition Diagram, Parametric Diagram)
-   **Version Control with GitHub**
-   **CI/CD Integration for Automated Deployment**

**Base Project:** [https://github.com/rajuiit/sdlapps](https://github.com/rajuiit/sdlapps)

---

## Features

-   ✅ User Authentication & Authorization (JWT)
-   ✅ Funding Need Management (CRUD)
-   ✅ Donation Management
-   ✅ Stripe Payment Integration
-   ✅ Responsive Frontend Interface
-   ✅ RESTful API Backend
-   ✅ MongoDB Database Integration
-   ✅ Automated CI/CD Pipeline
-   ✅ AWS Cloud Deployment

---

## Technology Stack

**Frontend:**

-   React.js
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

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/khangdev20/donation-tracker.git
    cd ./donation-tracker
    ```

2.  **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the backend directory:

    > 🔐 **Environment Variables**  
    > For security reasons, environment variables are stored in a secure vault.  
    > Access the complete `.env` configuration from: **[1Password Shared Vault](https://share.1password.com/s#ba90MVxL8_GwF9mApadVBNZpSruogFcWrE1Kf6gi6WI)**

    > ⚠️ **Warning** ⚠️  
    > The **Secret Keys / Credentials** are for **testing purposes only**.  
    > ❌ Do **NOT** use them in a **production** environment.

    **Required Environment Variables:**

    ```env
    MONGO_URI=<MongoDB Atlas Connection String>
    JWT_SECRET=<JSON Web Token Secret Key>
    BLOB_READ_WRITE_TOKEN=<Vercel Blob Storage Token>
    STRIPE_SECRET_KEY=<Stripe Test Secret Key>
    STRIPE_WEBHOOK_SECRET=<Stripe Webhook Secret>
    CLIENT_URL=http://localhost:3000
    PORT=5001

    # SMTP Configuration
    SMTP_HOST=<SMTP Server Host>
    SMTP_USER=<SMTP Username/Email>
    SMTP_PASS=<SMTP Password/App Password>
    SMTP_PORT=<SMTP Port Number>
    ```

4.  **Database Setup**

    -   Install MongoDB locally or use MongoDB Atlas
    -   Update the `MONGODB_URI` in your `.env` file

5.  **Packages Installation**

    ```bash
    npm run install-all
    ```

6.  **Start Backend and Frontend Concurrently**

    ```bash
    npm start
    for development
    npm run dev
    ```

7.  **Access the Application**
    -   Frontend: `http://localhost:3000`
    -   Backend API: `http://localhost:5001`

### Production Deployment

The application is automatically deployed via GitHub Actions CI/CD pipeline when changes are pushed to the main branch.

---

## Live Application

🌐 **Public URL:** https://ifn636-donation.khangvo.dev/

### Test Credentials

For assessment and demonstration purposes, you can use the following credentials:

**Username:** `testing1@example.com`  
**Password:** `Testing@123`

_Note: These are test credentials created specifically for assessment purposes._

---

## Project Management

### JIRA Board

**JIRA Project URL:** https://ifn636-ses2.atlassian.net/jira/software/projects/ODT/boards/34

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
    - Environment-specific configurations

**Pipeline Status:** [![CI/CD Pipeline](https://github.com/khangdev20/donation-tracker/workflows/CI-CD/badge.svg)](https://github.com/khangdev20/donation-tracker/actions)

## Architecture

The application follows a **3-tier MERN architecture**:

-   **Frontend (Client Layer):** Built with **React.js**, providing a responsive user interface for authentication, funding needs, and donations.
-   **Backend (Application Layer):** Implemented with **Node.js & Express.js**, exposing RESTful APIs for CRUD operations, authentication, and payment handling.
-   **Database (Data Layer):** **MongoDB** stores users, fundraising campaigns, and donation records.

**Deployment:**

-   **Frontend** runs locally or can be hosted on cloud platforms.
-   **Backend** is deployed on **AWS EC2**, connected to **MongoDB Atlas**.
-   **Stripe API** integrates payment processing.
-   **CI/CD** is handled via **GitHub Actions**, automating testing and deployment.

## Reflection

-   Learned the importance of creating **diagrams**, especially **parametric diagrams**, to clarify system architecture and data flows.
-   Faced an issue with **AWS EC2**: the instance stopped every night, causing the **public IP** to change.
-   Solved it by assigning an **Elastic IP**, ensuring a **static address** and reliable access to the application.
