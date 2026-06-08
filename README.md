### DechenDorji_02250348_DS0101

## Assignment 1(todo-app) report

# Introduction
This project is a full-stack Todo Application developed using React for the frontend, Express.js and Node.js for the backend, and PostgreSQL as the database. The application allows users to add, view, and delete tasks.

# Technologies Used
React.js
Node.js
Express.js
PostgreSQL
Docker
GitHub
Render

# Implementation
The frontend was developed using React and communicates with the backend through REST APIs. The backend was built using Express.js and connects to a PostgreSQL database. The application data is stored in a PostgreSQL table named tasks.

Docker was used to containerize both frontend and backend services. The source code was pushed to GitHub and deployed on Render. Environment variables were configured to connect the frontend, backend, and database services.

# Challenges Faced
Several issues were encountered during deployment, including:

Git push conflicts
Database connection errors
Missing database tables
CORS policy errors
Incorrect environment variable configuration
Frontend and backend deployment path issues
These issues were resolved by updating configuration settings, creating the required database table, correcting API URLs, and redeploying the services.

# live URL
https://fe-todo-02250348-1.onrender.com

# GitHub Repository
https://github.com/deedox605/DSO-101-FINAL.git

# Conclusion
The Todo Application was successfully developed and deployed on Render. Users can add, view, and delete tasks, and the application stores data in a PostgreSQL database. This project provided practical experience in full-stack web development, Docker containerization, database management, and cloud deployment.

### Assignment 3(Continuous Integration and Continuous Deployment (CI/CD)) report

## Introduction
The purpose of this assignment was to implement a CI/CD pipeline for a Todo Application using GitHub Actions, Docker, DockerHub, and Render. The goal was to automate the process of building, testing, and deploying the application.

# Steps Taken
First, I verified that the GitHub repository was properly configured and contained the required project files. Next, I created Dockerfiles for both the frontend and backend applications and tested them locally using Docker.

After successfully building the Docker images, I pushed them to DockerHub under separate repositories for the frontend and backend. I then created a GitHub Actions workflow file (deploy.yml) to automate the build and deployment process whenever changes were pushed to the main branch.

To complete the deployment process, I connected the application to Render and configured a deployment webhook. GitHub Secrets were used to securely store DockerHub credentials and the Render deployment hook URL.

# Challenges Faced
During the implementation, I faced several challenges such as Docker connection errors,  workflow configuration errors, and GitHub secret configuration problems. These issues were resolved through troubleshooting, correcting environment variables, and fixing workflow syntax errors.

# Learning Outcomes
Through this assignment, I learned how to containerize applications using Docker, manage container images with DockerHub, automate workflows using GitHub Actions, and deploy applications using Render. I also gained practical experience in implementing a complete CI/CD pipeline and debugging deployment issues.

# live URL
https://fe-todo-02250348-1.onrender.com

# GitHub Repository
https://github.com/deedox605/DSO-101-FINAL.git

## Screenshots

GitHub Repository
![repo.png](backend/repo.png)

GitHub Actions Workflow
![action.png](backend/action.png)

Render Deployment
![deploy.png](backend/deploy.png)

Live Website
![website.png](backend/website.png)

# Conclusion
Successfully completed both Assignment 1 (Docker deployment) and Assignment 3 (CI/CD automation). The todo app is fully functional and every code change automatically triggers a complete CI/CD pipeline, demonstrating professional DevOps practices.