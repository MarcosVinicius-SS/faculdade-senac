# 🕐 HourSync — Academic Hours Management
 
> A complete platform for tracking academic complementary hours, with a mobile app for students, a web dashboard for coordinators and administrators, and an API as the system base. Developed as a **Capstone Project** for the **Systems Analysis and Development Program (3rd Semester)** at **Senac College Pernambuco**.
 
[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat&logo=react&logoColor=black)](https://reactnative.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat&logo=render&logoColor=white)](https://render.com)
 
---
 
## 📋 About the Project
 
**HourSync** was created to solve a real problem: tracking complementary academic hours in colleges is still done manually — with spreadsheets, emails, and papers that get lost. Coordinators have no easy way to know how many hours each student has, and students have no simple place to check if their certificates were approved.
 
To fix this, we built a complete platform with three parts that work together:
 
- **Students** use the mobile app to send certificates and track their hours in real time.
- **Coordinators** use a web dashboard to review certificates from their course and approve or reject each one.
- **Administrators** have a full overview of everything: courses, coordinators, students, and system stats.
---
 
## 🔑 Main Features
 
- ✅ Login with automatic redirect to the right dashboard (student, coordinator, or admin)
- ✅ Send certificates with a photo or PDF directly from your phone
- ✅ Review your certificate before sending it (two-step process)
- ✅ Track approved, pending, and rejected hours
- ✅ Coordinators can approve or reject certificates
- ✅ Notifications when a certificate status changes
- ✅ Admin panel to manage courses, categories, and users
- ✅ Works as a PWA — can be installed on your phone like a regular app
---
 
## 🛠️ Technologies Used
 
The system has three parts, each with its own technologies:
 
**Backend (server and database)**
Built with **Node.js** and **Express**. It receives all requests from the app and the web dashboard, checks if the user has permission, and saves or fetches data from the database. We used **MongoDB** hosted on MongoDB Atlas as our database. Login uses **JWT** — a token system that makes sure only logged-in users can access protected data. Passwords are protected with **BCrypt**, which turns them into a code that cannot be read even if someone accesses the database.
 
**Web Frontend (dashboard for coordinators and admins)**
Built with plain **HTML, CSS, and JavaScript** — no heavy frameworks. Uses **Bootstrap 5.3** for the visual components. The system is also a **PWA (Progressive Web App)**, which means it can be installed from the browser like a regular app, and it even works offline thanks to the Service Worker.
 
**Mobile App (for students)**
Built with **React Native** and **Expo**, so it runs on both Android and iOS with the same code. Students can send certificates, track their hours progress, and get notifications — all from their phone.
 
---
 
## ⚙️ How to Run the Project
 
### What you need to have installed
 
- [Node.js](https://nodejs.org/) version 18 or higher
- [Expo CLI](https://docs.expo.dev/get-started/installation/) for the mobile app: `npm install -g expo-cli`
- A free [MongoDB Atlas](https://mongodb.com/cloud/atlas) account for the database
---
 
### 1. Running the Backend
 
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/backendHourSync.git
cd backendHourSync
 
# Install the dependencies
npm install
```
 
Create a file called `.env` in the root folder with the following:
 
```env
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/hoursync
JWT_SECRET=hoursync_jwt_secret_2026
PORT=3000
```
 
```bash
# Start the server
npm run dev
```
 
If everything works, open `http://localhost:3000` in your browser and you should see:
```json
{ "message": "API HourSync funcionando." }
```
 
---
 
### 2. Running the Web Frontend
 
The frontend does not need any installation. Just open the folder in VS Code and use the **Live Server** extension, or run:
 
```bash
npx serve .
```
 
To point to a different backend (local or production), just change one line in `shared/config.js`:
 
```javascript
window.HOURSYNC_API = "http://localhost:3000/api"; // local
// or
window.HOURSYNC_API = "https://backendhoursync-1.onrender.com/api"; // production
```
 
---
 
### 3. Running the Mobile App
 
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/HourSync---Aluno.git
cd HourSync---Aluno
 
# Install the dependencies
npm install
 
# Start Expo
npx expo start
```
 
- Press `a` to open on an Android emulator
- Press `i` to open on an iOS simulator (macOS only)
- Or scan the QR Code with the **Expo Go** app on your phone
> ⚠️ If you are testing on a real phone, replace `localhost` with your computer's IP address in `src/api/config.js`. Real devices cannot connect to `localhost`.
 
---
 
## 👥 Team
 
| Name |
|---|
| Arthur Vinicius |
| Marcos Vinicius |
| Thauan Bezerra |
| Caio Sabino |
| José Allamberg |
| Pedro Rodrigues |
 
**Institution:** Faculdade Senac Pernambuco
**Program:** Systems Analysis and Development — 3rd Semester
**Year:** 2026
 
---
 
## 📄 License
 
This project was developed for academic purposes as a Capstone Project at Faculdade Senac Pernambuco.
 
