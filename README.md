# cacheCraft

cacheCraft is a project designed for educational purposes to explore and implement caching mechanisms in API development.

## Overview

Caching is a critical concept in modern web application development. It helps improve the performance and efficiency of an application by storing frequently accessed data temporarily. cacheCraft serves as a hands-on learning experience for implementing caching techniques in an API environment.

## Features

- **Database Integration:** cacheCraft integrates with a PostgreSQL database to manage task-related data.

- **Cache Implementation:** The project demonstrates the use of caching to store and retrieve task data, reducing the need for repetitive database queries.

- **RESTful API:** cacheCraft offers a RESTful API for basic task management operations, such as creating, reading, updating, and deleting tasks.

## Getting Started

To get started with cacheCraft, follow these steps:

1. Clone the repository to your local machine.

2. Install the necessary dependencies using `npm install`.

3. Set up a PostgreSQL database and configure the connection details in the `./database.js` file.

4. Start the cacheCraft server using `npm start`.

5. Use your preferred API client (e.g., Postman, cURL) to interact with the API endpoints.

## API Endpoints

- **GET /tasks:** Retrieve a list of all tasks.

- **GET /tasks/:id:** Retrieve a specific task by ID, utilizing caching when available.

- **POST /tasks:** Create a new task.

- **PUT /tasks/:id:** Update an existing task and clear its cache.

- **DELETE /tasks/:id:** Delete a task and clear its cache.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Redis (for caching)
- UUID (for generating task IDs)

## Contribution

Contributions to cacheCraft are welcome! If you have ideas for improvements or new features, feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
