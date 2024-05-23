# Routes Documentation

## User Routes

### Register User

- **Route:** `POST /api/user/`
- **Functionality:** Registers a new user.
- **Middleware:** None
- **Controller:** `registerUser`

### Login User

- **Route:** `POST /api/user/login`
- **Functionality:** Logs in a user.
- **Middleware:** None
- **Controller:** `loginUser`

### Sign Out

- **Route:** `GET /api/user/signout`
- **Functionality:** Signs out a user.
- **Middleware:** None
- **Controller:** `signOut`

### Update User Fields

- **Route:** `PUT /api/user/update`
- **Functionality:** Updates user fields.
- **Middleware:** `checkAuth`
- **Controller:** `updateFields`

### Update User Password

- **Route:** `PUT /api/user/updatepassword`
- **Functionality:** Updates user password.
- **Middleware:** `checkAuth`
- **Controller:** `updatePassword`

### Filter Users

- **Route:** `GET /api/user/bulk`
- **Functionality:** Fetches bulk user data (for searching users).
- **Middleware:** None
- **Controller:** `filterUsers`

### Verify User

- **Route:** `GET /api/user/verify/:token`
- **Functionality:** Verifies a user account.
- **Middleware:** None
- **Controller:** `verifyUser`

### Update User Picture

- **Route:** `PUT /api/user/updatepicture`
- **Functionality:** Updates user profile picture.
- **Middleware:** `checkAuth`
- **Controller:** `updatePicture`

### Forgot Password

- **Route:** `POST /api/user/forgotpassword`
- **Functionality:** Initiates the password reset process.
- **Middleware:** None
- **Controller:** `forgotPassword`

### Reset Password

- **Route:** `POST /api/user/resetpassword`
- **Functionality:** Resets user password.
- **Middleware:** None
- **Controller:** `resetPassword`

## Stats Routes

### Save Stats

- **Route:** `POST /api/stats/`
- **Functionality:** Saves user statistics.
- **Middleware:** `checkAuth`
- **Controller:** `saveStats`

### Fetch Stats by ID

- **Route:** `GET /api/stats/:id`
- **Functionality:** Fetches user statistics by ID.
- **Middleware:** `checkAuth`
- **Controller:** `fetchStats`

### Fetch History by ID

- **Route:** `GET /api/stats/history/:id`
- **Functionality:** Fetches user history by ID.
- **Middleware:** None
- **Controller:** `fetchHistory`

### Fetch Bulk Data

- **Route:** `GET /api/stats/bulkdata`
- **Functionality:** Fetches bulk data for generating graphs.
- **Middleware:** `checkAuth`
- **Controller:** `fetchBulkData`
