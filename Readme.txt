
# E-commerce MERN Application

This is a full-stack E-commerce application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application allows users to browse products, add them to the cart, and place orders with Stripe payment integration.

## Features

- User Authentication and Authorization (Login/Register)
- Browse Products
- Add/Remove Products to/from Cart
- Place Orders with Stripe Payment Integration
- View Order History
- Admin Panel to Manage Products and Orders
- API Documentation with Swagger

## Technologies Used

- **Frontend**: React.js, Redux, Redux Toolkit, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Payment Gateway**: Stripe
- **Authentication**: JWT (JSON Web Token)
- **Styling**: CSS Modules
- **Documentation**: Swagger

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB server running locally or a MongoDB Atlas account.

### Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-mern.git
cd ecommerce-mern
```

### Backend Setup

1. **Navigate to the backend directory:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file in the `backend` directory with the following content:**

```env
NODE_ENV=development
PORT=5000
DB_LOCAL_URL=mongodb://127.0.0.1:27017/e-commerce-fasarath
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

4. **Start the backend server:**

```bash
npm run dev
```

### Frontend Setup

1. **Navigate to the frontend directory:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the frontend development server:**

```bash
npm start
```

## Usage

### Running the Application

- Ensure both frontend and backend servers are running.
- Open your browser and navigate to `http://localhost:3000`.

### API Documentation

- The API documentation is available at `http://localhost:5000/api-docs` once the backend server is running.

### Testing Stripe Integration

- Use the Stripe test card `4242 4242 4242 4242` with any future expiry date and CVC for testing payments.

## Project Structure

### Backend

- `controllers/`: Contains the logic for handling API requests.
- `models/`: Contains Mongoose schemas and models.
- `routes/`: Contains route definitions.
- `middleware/`: Custom middleware functions.
- `utils/`: Utility functions and error handlers.
- `config/`: Configuration files including database connection and Swagger setup.
- `uploads/`: Directory for storing uploaded images.

### Frontend

- `src/components/`: Reusable React components.
- `src/pages/`: React components representing different pages.
- `src/redux/`: Redux store, slices, and hooks.
- `src/assets/`: Static assets like images and icons.
- `src/App.js`: Main application component.
- `src/index.js`: Entry point for the React application.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact [your-email@example.com].
```

### A Few Notes:
1. **Ensure your `.env` file contains actual values** for `JWT_SECRET` and `STRIPE_SECRET_KEY`.
2. **Replace `your-username` and `your-email@example.com`** with your actual GitHub username and contact email.
3. **Update any paths or configurations** if they differ in your setup.
4. **Add any additional features** or configurations specific to your project that may be relevant for users or contributors.