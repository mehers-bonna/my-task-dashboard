# Donezo - Modern Task Management Dashboard

Donezo is a responsive and interactive dashboard application built with **React.js** and **Tailwind CSS**. Developed as a professional job task, this project demonstrates seamless API integration, secure authentication, and a modern UI/UX approach.

## Live Demo
View the live project here: https://sensational-fox-b1b6c7.netlify.app/

## Key Features
* Authentication: Secure login system with token-based access control and persistent sessions.
* Dynamic Dashboard: Real-time statistics (Revenue, Users, Growth) fetched directly from the API.
* Interactive Analytics: Visualized project data using Chart.js for better insights.
* Fully Responsive: Mobile-first design approach, optimized for smartphones, tablets, and desktops.
* Team Collaboration: Dynamic list of team members with status tracking (Active/Pending).
* Project Progress: Visual indicators for ongoing tasks and a built-in time tracker widget.

## Tech Stack
* Frontend: React.js
* Styling: Tailwind CSS (Utility-first CSS)
* Icons: Lucide React
* Charts: Chart.js & React-Chartjs-2
* HTTP Client: Axios (for API requests)
* Routing: React Router DOM

## Local Setup & Installation

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mehers-bonna/my-task-dashboard.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd donezo-dashboard
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```

## Test Credentials
To explore the dashboard, use the following credentials on the login page:
* **Email:** `user1@example.com`
* **Password:** `password123`

## API Reference
The application integrates with the following endpoint to fetch dashboard data:
`https://task-api-eight-flax.vercel.app/api/dashboard`
