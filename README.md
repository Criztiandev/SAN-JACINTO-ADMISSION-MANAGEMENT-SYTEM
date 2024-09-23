# SAN-JACINTO-ADMISSION-MANAGEMENT-SYSTEM

SAN-JACINTO-ADMISSION-MANAGEMENT-SYSTEM is a comprehensive web-based application designed to streamline the admission and registration processes for San Jacinto educational institutions. This system automates and simplifies various tasks related to student admissions, making it easier for both applicants and administrative staff.

## Features

- Online application submission
- Document upload and management
- Application status tracking
- Automated email notifications
- Admission criteria evaluation
- Interview scheduling
- Payment processing for application fees
- Reporting and analytics dashboard
- User roles (Admin, Staff, Applicant)
- Course and program management
- Integration with existing Student Information System (SIS)

## Tech Stack

- **Frontend:**
  - React.js for building user interfaces
  - Redux for state management
  - Material-UI for responsive design components
  - Axios for API requests

- **Backend:**
  - Node.js with Express.js
  - MongoDB for database
  - Mongoose as ODM
  - JSON Web Tokens (JWT) for authentication

- **Additional Technologies:**
  - PDF.js for document viewing
  - Chart.js for data visualization
  - Nodemailer for email notifications

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/san-jacinto-admission-system.git
   cd san-jacinto-admission-system
   ```

2. Install dependencies for the backend:
   ```
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add necessary environment variables (e.g., MongoDB URI, JWT secret, SMTP settings)

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the application.

## User Roles and Access Levels

1. **Admin:** Full access to all system features, including user management and system configuration.
2. **Staff:** Access to application review, interview scheduling, and reporting features.
3. **Applicant:** Ability to submit applications, upload documents, and track application status.

## API Documentation

For detailed API documentation, please refer to the [API_DOCS.md](API_DOCS.md) file.

## Contributing

We welcome contributions to the SAN-JACINTO-ADMISSION-MANAGEMENT-SYSTEM! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Testing

To run the test suite:

1. For backend tests:
   ```
   cd backend
   npm test
   ```

2. For frontend tests:
   ```
   cd frontend
   npm test
   ```

## Deployment

For instructions on how to deploy this application in a production environment, please see our [Deployment Guide](DEPLOYMENT.md).

## Data Privacy and Security

This system handles sensitive student information. Ensure compliance with relevant data protection regulations (e.g., FERPA) and implement robust security measures to protect user data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please email support@sanjacinto.edu or open an issue in the GitHub repository.

---

Empowering education through efficient admissions management!
