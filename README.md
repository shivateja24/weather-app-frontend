Weather App

Project Overview : This Weather App provides real-time weather updates based on a user's search or current location. It is built with a React.js frontend, a Node.js backend, and a MongoDB database hosted in the cloud. The app offers a responsive interface and dynamic weather-related animations, with features like user authentication, recent search history, and accurate weather data fetched from an external API.

Features: Real-time weather updates based on user input or location User authentication (login, signup) and secure storage of user data Recent search history displayed for logged-in users Responsive design with animations for different weather conditions Backend RESTful API built with Node.js and Express.js

Instructions to Set Up and Run the Project Locally Prerequisites: Node.js installed MongoDB Atlas account for database setup API key from a weather data provider (e.g., OpenWeatherMap)

Steps:

step-1 : Clone the repository: git clone https://github.com/shivateja24/weather-app-frontend.git

step-2 : Navigate to the project folder:

step-3 : Set up the backend: git clone https://github.com/shivateja24/weather-app-backend.git

step-4 :Navigate to backend folder and Install dependencies: npm install step-5: Create a .env file in the backend folder with the following content: MONGO_URI=your_mongo_connection_string JWT_SECRET=your_secret_key

step-6: Run the backend server: npm start

step-7 : Set up the frontend:

Navigate to the frontend directory:

step-8 : Install dependencies:

npm install Create a .env file in the frontend folder with your API key: API_KEY_WEATHER

step-9 : Run the React app: npm start

Access the application:

Frontend: Visit http://localhost:3000 Backend: The API will run at http://localhost:5000

//Hope you got the application working!!

API endpoints : 
POST - /login (body contains {username,password} ) 
POST - /signup (body contains {username,password} ) 
GET - /history (headers contains {Bearer <JWT_TOKEN>})
PUT - /history (header {application/content, authorization (Bearer <JWT_TOKEN>)} body contains {city,timestamp}

screenshots of application :

Desktop :

![image](https://github.com/user-attachments/assets/ecd07726-8942-4969-8296-a1c24fb03c17)


![image](https://github.com/user-attachments/assets/96cd06d9-eec5-487f-9a6a-e5096e846704)


![image](https://github.com/user-attachments/assets/df865c38-e6c9-4920-9b72-73618807416f)




Mobile : 

![image](https://github.com/user-attachments/assets/529d3c51-34cb-43f1-8bbd-c616fecde8dc)


Here is the deployed link for the application : 

https://66d5de236f15570f8dd7e538--bespoke-buttercream-55dc79.netlify.app/

Deployed using Netlify! .

