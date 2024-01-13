## Introduction

BlogList is a full-stack web application built with Express.js for the backend and React for the frontend. It allows users to sign up, log in, create blog posts, and manage their posts. The application also supports features like image uploads and category-based filtering.

Live at: https://listify-31cu.onrender.com

## Features

- **User Authentication:**
  - Signup and login functionality.
  - Token-based authentication for secure user sessions.

- **Blog Management:**
  - Create, update, and delete blog posts.
  - Image upload support for blog posts.

- **Category Filtering:**
  - Explore blog posts by clicking on categories.

- **User Account Management:**
  - Update user account information.
  - Delete user account.
    
## GitHub Actions

The project is configured with GitHub Actions for automatic deployment. Each push to the main branch triggers the workflow to build and deploy the application.

## Docker Compose

The application can be deployed using Docker Compose. The docker-compose.yml file in the root directory defines the services and configurations needed for deployment.

To deploy using Docker Compose, run the following command:

`docker compose up -d`

This will start the application in detached mode.

  
