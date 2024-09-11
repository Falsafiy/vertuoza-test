# Vertuoza Test Project

## Introduction

This project was developed as part of a technical test for **Vertuoza**. The objective was to create a front-end application using **Next.js** and several modern libraries and tools. The aim was to showcase expertise in the following technologies and best practices:

- **Next.js** for server-side rendering and routing.
- **TypeScript** for static typing.
- **Apollo Client** for managing GraphQL state.
- **GraphQL Faker** for generating mock data with a custom schema.
- **React Hook Form** for form handling and validation.
- **ESLint** and **Prettier** for code quality and formatting.
- **Shadcn** for UI styling with **Tailwind CSS**.
- **Ag-Grid** for rendering and managing large datasets in tables.

The project is structured using the latest features of **Next.js App Router**, providing optimized server-side rendering (SSR) and efficient client-side navigation.

---

## Installation and Setup

### 1. Install Dependencies

To get started, clone the repository and install the necessary dependencies.

```bash
npm install
# or
yarn install
```

### 2. Run the Mock GraphQL Server
The project requires a mock GraphQL server to provide the data. You can start it using Docker:

```bash
docker run -p 9002:9002 -v $(pwd)/server/schema.sdl:/app/schema.sdl apisguru/graphql-faker /app/schema.sdl
```
This will launch **GraphQL Faker** on port `9002` using the schema defined in `server/schema.sdl`.

### 3. Run the Development Server
With the dependencies installed and the mock server running, you can start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
The app will be available at http://localhost:3000. Changes made to the code will trigger automatic reloads for rapid development.


---

## Project Structure

- `app/`: Contains the core Next.js application logic, pages, and components.
    
    - `app/page.tsx`: Main entry point for the application.

- `components/`: Shared UI components like forms, buttons, etc.
- `graphql/`: Manages GraphQL operations.
   - `queries/`: Contains GraphQL queries to fetch data.
   - `mutations/: Contains GraphQL mutations for data updates.
- `server/`: Defines the mock GraphQL schema.
- `styles/`: Contains global styles and Tailwind CSS setup.

---

## Key Tools and Libraries

### Next.js
- React-based framework that provides server-side rendering and static site generation.
- Learn more: Next.js Documentation
### Apollo Client
- Manages GraphQL queries, mutations, and caching.
- Learn more: Apollo Client Documentation
### React Hook Form
- Provides an easy and performant way to handle forms and validations.
- Learn more: React Hook Form Documentation
### Ag-Grid
- A highly customizable data grid solution for displaying tabular data.
- Learn more: Ag-Grid Documentation
### GraphQL Faker
- Allows you to create a mock GraphQL API based on your schema for local development.
- Learn more: GraphQL Faker Documentation
### Shadcn + Tailwind CSS
- Tailwind CSS is a utility-first CSS framework used for rapid UI development, with Shadcn providing styled components.
- Learn more: Tailwind CSS Documentation
### ESLint & Prettier
- Ensures code quality and consistency by providing linting and formatting.
- Learn more: ESLint Documentation and Prettier Documentation

---
## Deployment

To deploy the application, the easiest approach is to use **Vercel**, the official hosting platform for **Next.js** applications:

1. **Push** your code to a GitHub repository.
2. **Head over to [Vercel](https://vercel.com/new)** and link the repository.
3. **Follow the prompts** to deploy the application in a few simple steps.

For more information on deploying a Next.js app to Vercel, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).
