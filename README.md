
# 🧭 Full-Stack App – Dockerized, Automated & Deployed

A complete **Docker-powered full-stack application** using:

- **Frontend**: Next.js
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas + Local Dev)
- **Containerization**: Docker, Docker Compose
- **CI/CD**: GitHub Actions
- **Deployment**: Render (Free Tier)

---

## 🐳 1. Docker Images

### 📘 What is a Docker Image?
A **Docker image** is a lightweight, standalone, and executable package that includes everything needed to run a piece of software: code, runtime, libraries, and dependencies.

### ✅ What I Did
- Created **custom Dockerfiles** for both:
  - `tasks/Dockerfile` (Frontend)
  - `server/Dockerfile` (Backend)
- Used **multi-stage build** in the frontend to optimize the image:
  ```Dockerfile
  FROM node:18 AS deps
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build
  EXPOSE 3000
  CMD ["npm", "start"]
  ```
- Exposed ports (`3000` for frontend, `5500` for backend)
- Used `CMD` for container startup instructions
- Ignored unnecessary files via `.dockerignore`

---

## 📦 2. Docker Containers

### 📘 What is a Docker Container?
A **container** is a runtime instance of a Docker image. It runs your application in an isolated environment.

### ✅ What I Did
- Ran containers using `docker run` and `docker-compose`
- Resolved port conflicts (`EADDRINUSE`)
- Deployed these containers to **Render** as web services
- Mapped internal ports (e.g., `3000:3000`, `5500:5500`)

---

## 🔄 3. Docker Compose

### 📘 What is Docker Compose?
`docker-compose.yml` is a tool for defining and running multi-container Docker applications. You describe services, volumes, networks, etc.

### ✅ What I Did
- Defined a full `docker-compose.yml` with:
  - **mongodb** service (official MongoDB image)
  - **backend** service (built from `./server`)
  - **frontend** service (built from `./tasks`)
- Used `build`, `depends_on`, and `healthcheck`
- Declared `env_file` for backend
- Set `restart: always` for MongoDB
- Isolated containers on a custom network `job-net`

---

## 🧠 4. Docker Volumes

### 📘 What is a Docker Volume?
A **volume** is a persistent storage mechanism that exists outside the container lifecycle.

### ✅ What I Did
- Created named volumes:
  ```yaml
  volumes:
    - mongo_data:/data/db
    - mongo_config:/data/configdb
  ```
- Ensured MongoDB data persists even after container stops

---

## 🌐 5. Docker Networking

### 📘 What is Docker Networking?
Docker containers communicate via virtual networks. The **bridge** network allows isolated, internal communication.

### ✅ What I Did
- Created a custom bridge network `job-net`
- Connected `mongodb`, `backend`, and `frontend` to it
- Enabled seamless internal communication (e.g., `mongodb:27017`)

---

## ❤️‍🔥 6. Healthchecks

### 📘 What is a Healthcheck?
A **healthcheck** tells Docker whether a container is functioning as expected.

### ✅ What I Did
- Configured healthchecks for all services:
  - **MongoDB**: `db.adminCommand('ping')`
  - **Backend**: `curl -f http://localhost:5500/health`
  - **Frontend**: `curl -f http://localhost:3000`
- Used `start_period`, `interval`, and `retries` for stability

---

## 🔁 7. CI/CD with GitHub Actions

### 📘 What is GitHub Actions?
GitHub Actions automates tasks like building, testing, and deploying code whenever you push to your repository.

### ✅ What I Did
Created a CI/CD workflow in `.github/workflows/deploy.yml`:
- Checked out code
- Built Docker images for frontend and backend
- Logged into Docker Hub using GitHub Secrets
- Tagged and pushed latest images to Docker Hub

```yaml
      - name: 📦 Tag and Push Backend Image
        run: |
          docker tag backend-image ${{ secrets.DOCKER_USERNAME }}/backend:latest
          docker push ${{ secrets.DOCKER_USERNAME }}/backend:latest
```

---

## 🚀 8. Deployment to Render

### 📘 What is Render?
Render is a cloud platform to host full-stack apps with free-tier support for static sites and web services.

### ✅ What I Did
- Created two **Web Services** on Render:
  - `frontend-service`
  - `backend-service`
- Connected to **MongoDB Atlas**
- Set environment variables:
  - `DB_CONNECT` (in backend Render dashboard)
  - `NEXT_PUBLIC_API_BASE_URL` (in frontend Render dashboard)
- Triggered rebuild by adding dummy var like `FORCE_REBUILD=123`

---

## 🐞 9. Debugging & Fixes

### ✅ What I Solved
- ❌ Incorrect use of `localhost` in production → ✅ Replaced with Render URL
- ❌ API error: `Failed to load tasks` → ✅ Pointed frontend to deployed backend
- ❌ `.env` not working in frontend → ✅ Used `NEXT_PUBLIC_` prefix + rebuild
- ❌ CORS issues → ✅ Inspected headers and fixed origins
- ✅ Used browser DevTools & logs to trace issues effectively

---

## ✅ 10. Final Working App

- Tasks load successfully from deployed frontend
- Backend fetches data from MongoDB Atlas
- Everything is containerized, CI/CD enabled, and live on Render

---

## 🧾 Summary: Project Workflow

```
1. Write backend (Node.js + Express) and frontend (Next.js) code
2. Create Dockerfiles for each
3. Build and test images locally
4. Write docker-compose.yml to manage all services
5. Add volume support for MongoDB
6. Configure networking and healthchecks
7. Create GitHub Actions workflow for CI/CD
8. Push code to GitHub → CI builds and pushes images to Docker Hub
9. Deploy to Render with correct env vars and rebuild
10. Final app is live and fully functional 🎉
```

---

## 🛠️ Tech Stack

| Layer       | Technology       |
|-------------|------------------|
| Frontend    | Next.js          |
| Backend     | Express.js       |
| Database    | MongoDB Atlas    |
| CI/CD       | GitHub Actions   |
| Container   | Docker, Compose  |
| Hosting     | Render           |
| Registry    | Docker Hub       |

---

## 🌐 Live URLs

- **Frontend**: [https://frontend-service-9ksx.onrender.com](https://frontend-service-9ksx.onrender.com)
- **Backend**: [https://backend-service-hdcp.onrender.com](https://backend-service-hdcp.onrender.com)

---

## 🧠 Build By

Built with ❤️ by [Akshay] - A full-stack Dockerized deployment from scratch to cloud.  
Great job shipping it to production!