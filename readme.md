# Visitly 

A full-stack city review web app where users can search for cities, log visits, and share their experiences.

## Features

-  User authentication (register, login, logout)
-  City search from a global database (all countries & cities JSON)
-  Add, edit, and delete your own visit entries
-  View visit history for each city
-  Authorization: only the visit owner can edit/delete their post
-  Clean UI with Bootstrap navbar
-  Data stored in MongoDB

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bootstrap
- **Database:** MongoDB (Mongoose)
- **Session Auth:** express-session, bcrypt

## Setup

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-username/visitly.git
   cd visitly
Install dependencies:

npm install
Set up .env:

MONGO_URI=mongodb+srv://<your-mongodb-uri>
Seed database with cities:


node seed.js
Run the app:


nodemon server.js
Visit:
http://localhost:3000


