# SMV Konveyor API Playground

This repository is a playground for the SMV Konveyor API, which can be used for applying for a visa for anyone from India. The UI playground is built using React, Tailwind CSS, TypeScript, and Ant Design components.

A deployed version is available at [playground.stampmyvisa.com](https://playground.stampmyvisa.com).

## Pages Summary

### 1. Home Page

The home page provides information about our product, SMV Konveyor, and includes:

- A brief description of SMV Konveyor
- A link to our landing page
- A link to our Postman documentation

### 2. Auth Page

The Auth Page contains a form with three fields: environment, client ID, and client secret. Default values are provided for each field:

- Environment: `staging`
- Client ID: `<client_id>`
- Client Secret: `<client_secret>`

Users can use these default values or input their own to generate an auth token using the API. The information is stored in an auth context to be used later in other components. This information is also displayed in a modal, which can be opened on any page by clicking a button in the top right corner.

### 3. Pre-built Playgrounds Page

This page displays cards with the following information for each pre-built playground:

- Playground Name
- Description
- A photo showing what it looks like
- Tags indicating which APIs are used in the playground

Clicking on any playground opens a separate route for that playground, where components built on top of the APIs are shown. For example:

- **Playground Name:** List Orders
- **Description:** Use the search API to list active orders in a tabular form
- **Photo:** `<link>`
- **Tags:** search-orders

### 4. Playground Page

This page renders a playground based on URL parameters. It includes components that use different APIs to demonstrate the powerful capabilities of our APIs. For example, the List Orders Playground shows a table using Ant Design that lists orders using the search API. It includes search capability and filtering on order status. The token and environment from the Auth Context are used to populate data for this component.

## Getting Started

To scaffold the project, create a new repository with all the boilerplate and npm packages configured. We will use npm and Vite for this.

```bash
# Clone the repository
git clone https://github.com/smv-engineering/smv-konveyor-playground.git

# Navigate to the project directory
cd smv-konveyor-playground

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Available Scripts

In the project directory, you can run:

`npm run dev`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm run build`
Builds the app for production to the `dist` folder.

`npm run lint`
Runs ESLint to check for linting errors.
