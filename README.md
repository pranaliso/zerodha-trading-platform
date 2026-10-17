# zerodha-trading-platform
A full-stack stock trading platform inspired by Zerodha, built using MongoDB, Express.js, React.js, and Node.js, featuring user authentication, watchlists, holdings, positions, orders, and funds management.

# Zerodha-Inspired Trading Platform

A full-stack stock trading platform inspired by Zerodha Kite, developed using the MERN stack. The project demonstrates frontend development, REST API integration, database management, and core trading-dashboard workflows.

> **Disclaimer:** This is an independent educational project inspired by the user interface and workflows of online trading platforms. It is not affiliated with or endorsed by Zerodha. It does not provide real brokerage services or execute real stock-market trades.

## Features

- **User Authentication** — user registration and login.
- **Trading Dashboard** — centralized view of trading-related information.
- **Watchlist** — view and manage stocks of interest.
- **Holdings & Positions** — display portfolio holdings and trading positions.
- **Order Management** — manage orders within the application.
- **Funds Management** — view and manage simulated account funds.
- **REST API Integration** — communication between the frontend and backend.
- **Database Integration** — persist application data using MongoDB.

*Feature availability depends on the current implementation and configuration.*

## Tech Stack

- **Frontend:** React.js, JavaScript, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Architecture:** MERN stack, REST APIs

## Project Structure

```text
zerodha-trading-platform/
├── frontend/     # Landing page and public-facing interface
├── dashboard/    # Trading dashboard
├── backend/      # Server, API routes, controllers and models
├── package.json
├── package-lock.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB connection
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/zerodha-trading-platform.git
cd zerodha-trading-platform
```

Install dependencies for each application:

```bash
npm install
cd frontend
npm install
cd ../dashboard
npm install
cd ../backend
npm install
```

Configure your environment variables according to the backend configuration before starting the application. Never commit real passwords, database credentials, JWT secrets, or API keys.

### Running the Application

Start each component using the scripts defined in its respective `package.json`. Check the available scripts with:

```bash
npm run
```

Run the frontend, dashboard, and backend in separate terminals as required by the project configuration.

## Future Improvements

- Docker-based containerization
- Cloud deployment
- Improved validation and error handling
- Automated testing
- Responsive UI improvements
- Secure environment-based configuration

## Learning Outcomes

This project provides practical experience with full-stack development, React component architecture, Express APIs, MongoDB integration, authentication workflows, and application deployment.

## Author

**Pranali Sonawane**  
BE Information Technology Student | Full-Stack Development

## License

Add a license only after choosing the terms under which you want others to use your code.
