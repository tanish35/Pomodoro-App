# Pomodoro App


[![GitHub release](https://img.shields.io/github/v/release/tanish35/Pomodoro-App)](https://github.com/tanish35/Pomodoro-App/releases)
[![GitHub issues](https://img.shields.io/github/issues/tanish35/Pomodoro-App)](https://github.com/tanish35/Pomodoro-App/issues)
[![GitHub forks](https://img.shields.io/github/forks/tanish35/Pomodoro-App)](https://github.com/tanish35/Pomodoro-App/network)
[![GitHub stars](https://img.shields.io/github/stars/tanish35/Pomodoro-App)](https://github.com/tanish35/Pomodoro-App/stargazers)
[![GitHub license](https://img.shields.io/github/license/tanish35/Pomodoro-App)](https://github.com/tanish35/Pomodoro-App/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

Welcome to our Pomodoro App! This productivity tool is designed to help you manage your time effectively using the Pomodoro Technique. With this app, you can break your work into intervals, traditionally 25 minutes in length, separated by short breaks.

## Features

- **Timer Management**: Start, pause, and reset timers.
- **Custom Intervals**: Set custom work and break intervals.
- **Notifications**: Get notified when intervals end.
- **Progress Tracking**: Track your productivity over time.



**Backend URL**: THE BACKEND IS LIVE.

```bash
https://api.tanish.me
```

**Frontend URL**: THE FRONTEND IS LIVE.

```bash
https://app.tanish.me
```

# Getting Started

**Using Docker**

1. **Clone the Repository**: Begin by cloning this repository to your local machine.

   ```bash
   git clone <repository_url>
   ```

2. **Run the dockerfile:**
   ```
   docker-compose up --build
   ```

**Without using Docker**

1. **Clone the Repository**: Begin by cloning this repository to your local machine.

   ```bash
   git clone <repository_url>
   ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies for both the frontend and backend.

   ```bash
   cd pomodoro-app
   npm install
   cd backend
   npm install
   cd ..
   cd frontend
   npm install
   cd ..
   ```

3. **Set Environment Variables**: Before running the app, make sure to set the required environment variables. You will need to set the following variables in your environment file:

   - `PORT`: Port number for the server.
   - `DATABASE_URL`: URL for your MongoDB database.
   - `SECRET`: Secret key for JWT authentication.
   - `GOOGLE_CLIENT_ID`: OAuth 2.0 Google Client ID.
   - `GOOGLE_CLIENT_SECRET`: OAuth 2.0 Google Client Secret.

4. **Run the Backend**: To start the backend and frontend server, run the following command from the root directory of the project.

   ```bash
   npm run dev
   ```

   This command will start both the server and client concurrently.

5. **Access the App**: Once the server is up and running, you can access the Pomodoro App by opening your browser and navigating to `http://localhost:3000`.

# Explore our Swagger Page

Explore our API routes conveniently on our Swagger page available at https://api.tanish.me/api-docs/. This interactive documentation provides a comprehensive overview of our API endpoints, allowing you to easily understand and test the functionality of each route. Whether you're integrating our APIs into your application or simply exploring the capabilities of our platform, our Swagger page offers a user-friendly experience to streamline your development process.

# Tech Stack

- **Frontend**: Built with React.js.
- **Backend**: Utilizes Node.js and Express.js.
- **Database**: MongoDB, managed with Prisma ORM.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
- **Authentication**: OAuth 2.0 is being used with Google for user-friendly Sign-In.

# Usage

- **Create Tasks**: Add tasks to your to-do list and assign them estimated Pomodoro intervals.
- **Start Timer**: Initiate the Pomodoro timer to focus on a task for a set duration.
- **Track Progress**: Monitor your productivity with the session and task history.
- **Customizable Settings**: Adjust timer durations and intervals to suit your preferences.

# Contributing

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve the app.

---

Thank you for using our Pomodoro App! If you have any questions or feedback, please don't hesitate to contact us.
