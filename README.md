# Pomodoro App

Welcome to our Pomodoro App! This productivity tool is designed to help you manage your time effectively using the Pomodoro Technique. With this app, you can break your work into intervals, traditionally 25 minutes in length, separated by short breaks.

# Getting Started

# Using Docker

1. **Clone the Repository**: Begin by cloning this repository to your local machine.

   ```bash
   git clone <repository_url>
   ```

2. **Run the dockerfile:**
   ```
      docker-compose up --build
   ```
# Without using Docker
1. **Clone the Repository**: Begin by cloning this repository to your local machine.

   ```bash
   git clone <repository_url>
   ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies for both the frontend and backend.

   ```bash
   cd pomodoro-app
   npm install
   cd client
   npm install
   ```

3. **Set Environment Variables**: Before running the app, make sure to set the required environment variables. You will need to set the following variables in your environment file:

   - `PORT`: Port number for the server.
   - `DATABASE_URL`: URL for your MongoDB database.
   - `SECRET`: Secret key for JWT authentication.
   - `GOOGLE_CLIENT_ID`: OAuth 2.0 Google Client ID.
   - `GOOGLE_CLIENT_SECRET`: OAuth 2.0 Google Client Secret.

4. **Run the Backend**: To start the backend server, run the following command from the root directory of the project.

   ```bash
   npm run dev
   ```

   This command will start both the server and client concurrently.

5. **Access the App**: Once the server is up and running, you can access the Pomodoro App by opening your browser and navigating to `http://localhost:3000`.

**Tech Stack**

- **Frontend**: Built with React.js.
- **Backend**: Utilizes Node.js and Express.js.
- **Database**: MongoDB, managed with Prisma ORM.
- **Authentication**: JWT (JSON Web Tokens) for secure user authentication.
- **Authentication**: OAuth 2.0 is being used with Google for user-friendly Sign-In.

**Usage**

- **Create Tasks**: Add tasks to your to-do list and assign them estimated Pomodoro intervals.
- **Start Timer**: Initiate the Pomodoro timer to focus on a task for a set duration.
- **Track Progress**: Monitor your productivity with the session and task history.
- **Customizable Settings**: Adjust timer durations and intervals to suit your preferences.

**Contributing**

Contributions are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve the app.

---

Thank you for using our Pomodoro App! If you have any questions or feedback, please don't hesitate to contact us.
