# Booking Platform REST API

This is a REST API built with NestJS for managing services and customer bookings. It was developed as part of the EN2H Software Engineer Intern (NestJS) technical assignment.

## Project Overview

The system allows administrators to manage an inventory of IT/Consulting services. Customers can publicly view and book these services for specific dates and times. 

### Key Features Implemented:
- **Authentication:** JWT-based login/registration for administrators.
- **Service Management:** Full CRUD capabilities for services (Protected by JWT).
- **Booking Management:** Public booking creation, protected viewing/updating of bookings.
- **Business Logic Validations:** Prevents past dates, duplicate time slots, and invalid state transitions.
- **Bonus Features:** Global Exception Handling, Class Validation, SQLite Database with TypeORM, Swagger API Documentation.

---

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd en2h_assessment
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Environment Variables

Copy the provided example environment file to create your local environment setup:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
- `PORT=3000`
- `JWT_SECRET=your_jwt_secret`

## Database Setup

This project uses **SQLite** as the database to ensure a seamless, zero-configuration setup for evaluation.
- The database is file-based and will automatically be created as `database.sqlite` in the root directory when the application starts.
- No separate database server installation (like PostgreSQL) is required to run the project.

## Running the Application

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Running Migrations

Because this project utilizes `TypeORM` with `synchronize: true` for the SQLite development environment, **database tables are automatically generated and synchronized** upon application startup. 


## API Documentation

Swagger has been integrated into the project for interactive API documentation and testing.
Once the application is running, navigate to:
**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

From there, you can view all endpoints, test payloads, and authenticate using the "Authorize" button (by passing your JWT Bearer token).

---

## Assumptions Made
1. **Public Bookings:** It is assumed that identifying customers relies entirely on the email/phone provided in the DTO, rather than a logged-in user session.
2. **Admin Role:** The assessment states "Authenticated users should be able to manage services". It is assumed that any user who successfully registers and logs in has administrative privileges for the scope of this MVP.
3. **Database Choice:** SQLite was chosen over PostgreSQL for the submission to ensure the evaluator can run the API instantly without needing to configure local Postgres credentials or Docker containers.

## Future Improvements
- Implement a formal Role-Based Access Control (RBAC) system with distinct `ADMIN` and `CUSTOMER` roles.
- Migrate database to PostgreSQL via Docker Compose for production readiness.
- Add TypeORM Migration generation scripts.

