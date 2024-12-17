
![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![API](https://img.shields.io/badge/API-RESTful-red)

# Contact Bridge API

## Introduction

This project implements a backend API to compare contacts between multiple platforms (e.g., Mailchimp, Pipedrive). It fetches and compares contacts, identifying which contacts exist exclusively in one platform or the other. The project is designed to be scalable and extensible for integrating additional platforms in the future.

I intentionally kept the Pipedrive and Mailchimp endpoints. They weren’t strictly necessary for the project since the compare-contacts endpoint would have been sufficient. However, I left them to allow debugging of individual platforms in case of any issues.

---

## Features
1. **Seamless Third-Party Integration**
   - Connects to leading platforms like **Mailchimp** (email marketing) and **Pipedrive** (CRM).  

2. **Contact Comparison**
   - Compares contacts across platforms to identify differences, enabling data consistency.

3. **API-Driven Design**
   - Clean, modular, and extensible API structure, making it easy to add new platforms like **HubSpot** or **Salesforce**.

4. **Robust Error Handling**
   - Provides descriptive error messages and ensures reliable integration with external APIs.

5. **Dockerized Deployment**
   - Simple deployment with Docker and Docker Compose.

---

## Why I Made These Choices

### 1. API-Driven Design

The project follows an API-driven architecture where each route serves a specific purpose:
- **GET /mailchimp/contacts**: Fetch contacts from Mailchimp.
- **GET /pipedrive/contacts**: Fetch contacts from Pipedrive.
- **GET /compare-contacts**: Compare contacts between Mailchimp and Pipedrive.

This separation of routes ensures flexibility and simplifies debugging.

This separation of routes ensures flexibility and simplifies debugging.

### 2. Folder Structure and Naming

The folder structure is designed to adhere to clean architecture principles:

- **src/api/routes**: Defines HTTP routes for specific modules.
- **src/api/controllers**: Handles request/response logic.
- **src/domain/connectors**: Handles interaction with external APIs (e.g., Mailchimp, Pipedrive).
- **src/domain/services**: Implements business logic (e.g., fetching and comparing contacts).
- **src/utils**: Provides reusable utilities (e.g., logging, comparison logic).

This modular design makes the codebase easy to navigate, test, and extend.

### 3. External Platform Integration

The MailchimpConnector and PipedriveConnector are responsible for interacting with their respective APIs. They:
	
- Fetch data from external platforms using API keys.
- Abstract API-specific logic, enabling easy replacement or integration with additional platforms (e.g., Salesforce, HubSpot).

### 4. Contact Comparison Logic

The contact comparison feature is implemented as a utility function (CompareContacts). It:
- Takes contact lists from two platforms.
- Returns two lists: contacts unique to the first platform and contacts unique to the second platform.

Example Response:
```json
{
    "mailchimpOnly": [
        {
            "emailAddress": "mca319@hotmail.com",
            "phoneNumber": null,
            "source": "mailchimp",
            "rating": null,
            "contactDateAdded": "2024-11-25T15:37:16+00:00"
        }
    ],
    "pipedriveOnly": [
        {
            "emailAddress": "tony.turner@moveer.com",
            "phoneNumber": "218-348-8528",
            "source": "pipedrive",
            "rating": null,
            "contactDateAdded": "2024-11-25 15:16:13"
        },
        {
            "emailAddress": "gloria.quinn@empowermmove.com",
            "phoneNumber": "862-252-9773",
            "source": "pipedrive",
            "rating": null,
            "contactDateAdded": "2024-11-25 15:16:13"
        }
    ]
}
```

### 5. Error Handling

Error handling ensures that the API provides meaningful feedback to clients:
- If an external platform API call fails, the error is logged, and a descriptive message is returned to the client.

Example Response:
```json
{
  "success": false,
  "message": "Failed to fetch contacts from Mailchimp"
}
```

## API Documentation

Endpoints

#### 1.	GET /mailchimp/contacts
- Fetches all contacts from Mailchimp.
- Returns a list of contacts with attributes like email, phone number, and source.
#### 2.	GET /pipedrive/contacts
- Fetches all contacts from Pipedrive.
- Returns a list of contacts with attributes like email, phone number, and source.
#### 3.	GET /compare-contacts
- Fetches and compares contacts from Mailchimp and Pipedrive.

#### 4. GET /contacts/:platform
- Description: Fetches contacts dynamically from the specified platform.
##### Parameters:
- :platform (path parameter): The platform name (e.g., “mailchimp”, “pipedrive”).

- Returns: A list of contacts from the requested platform.

##### Returns:

- Contacts unique to Mailchimp.

- Contacts unique to Pipedrive.

## Future Improvements

This project meets the current requirements but can be enhanced further:

## Backend:

#### 1.	Add More Platforms:
- Add connectors for additional CRMs and marketing tools (e.g., Salesforce, HubSpot).

- Abstract platform-specific logic into reusable patterns.
#### 2.	Caching:
- Implement caching to reduce API calls and improve performance.
#### 3.	Authentication:
- Add authentication for API consumers (e.g., API keys, OAuth).

## How to Run the Project

### Prerequisites
```bash
Ensure you have the following installed:
	•	Node.js (>=14.x)
	•	Docker
```

Environment Variables

Create a .env file in the project root with the following variables:

```bash
MAILCHIMP_API_KEY=<your_mailchimp_api_key>
MAILCHIMP_LIST_ID=<your_mailchimp_list_id>
PIPEDRIVE_API_KEY=<your_pipedrive_api_key>
PORT=3000
```

Running the Application

### 1.	Install Dependencies:

npm install


### 2.	Run the Application:

npm start


### 3.	Access the API:
- Mailchimp Contacts: http://localhost:3000/mailchimp/contacts
- Pipedrive Contacts: http://localhost:3000/pipedrive/contacts
- Compare Contacts: http://localhost:3000/compare-contacts

I am also sharing POSTMAN Collection so you can test it easier.

Running Tests

To ensure everything is working as expected:
```bash
npm test
```
Deployment Using Docker

### 1.	Build and Run with Docker:
```bash
docker-compose up --build
```
### 2.	Access the API:
```bash
http://localhost:3000
```
### 3.	Stop the Containers:
```bash
docker-compose down
```


## Built By
**Melih Can Aydın**
Connect with me on:  
- [GitHub](https://github.com/melihcanaydin)  
- [LinkedIn](https://www.linkedin.com/in/melihcanaydin/)  

## Motivation
The goal of this project is to showcase my ability to:
- Integrate with widely-used third-party platforms like **Mailchimp** and **Pipedrive**.
- Build scalable, modular backend systems that are ready for production use.
- Solve common challenges like contact comparison and data synchronization across platforms.

This project reflects real-world scenarios where businesses need efficient data synchronization between marketing and CRM tools.