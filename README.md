# url-shortner
url shortner task


Getting Started
Prerequisites
Make sure you have the following installed on your machine:

Node.js
npm

Installation
Install Dependencies for the Backend

Navigate to the root directory of the project and run the following command to install the backend dependencies:

# npm install


Install Dependencies for the Frontend

After installing the backend dependencies, go to the /frontend/url-shortner-front-end directory:

# cd frontend/url-shortner-front-end

Then, run the following command to install the client-side dependencies:

# npm install


Create the .env File

At the root directory, create a .env file with the following example configuration:

Copy code
NODE_ENV=development
PORT=5000
MONGO_URI=<Your MongoDB Connection URI>
BASE_URL=http://example.url


Run the Project

Option 1: Run the backend and frontend separately:

Open two terminal windows:
In the first terminal, navigate to the root directory and run:

# npm run server

In the second terminal, navigate to /frontend/url-shortner-front-end and run:

# npm run start

Option 2: Run both the backend and frontend with one command:

You can also run both the backend and frontend using a single command from the root directory:

# npm run dev
Project Structure

/frontend/url-shortner-front-end    # Client-side React app
/                              # Backend server and project configuration files


Commands

# npm run server: Starts the backend server.
# npm run start: Starts the frontend React application.
# npm run dev: Starts both the backend server and frontend React application concurrently.