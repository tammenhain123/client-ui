# Project Setup and Execution Guide

This is a simple guide to install and run the project locally.

## Prerequisites

Make sure you have Node.js and Yarn installed on your machine before proceeding.

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [Yarn](https://yarnpkg.com/) (v1.x)

## Installation

1. Clone this repository to your local environment:

    ```bash
    git clone https://github.com/tammenhain123/client-ui
    ```

2. Navigate to the project directory:

    ```bash
    cd your-project
    ```

3. Install project dependencies using Yarn:

    ```bash
    yarn install
    ```

## Running the JSON Server

Before starting the development server, you need to run the JSON server to provide mock data.

1. Start the JSON server using the Yarn command:

    ```bash
    yarn json-server --watch db.json --port 3001
    ```

    Make sure to adjust the `db.json` file according to the data needed for your project.

## Running the Development Server

After starting the JSON server, you can start the development server.

1. Start the development server using the Yarn command:

    ```bash
    yarn dev
    ```

## Logins and passwords

When you run the system and are on the login page, you can log in with 2 users admin or user.

1. Admin
    email: admin@admin.com
    password: admin

2. User
    email: user@user.com
    password: user
