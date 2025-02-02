# Coolblue NextJS Assignment

In this assignment we would like you to build an amazing Pets web app using the provided mock-up designs. 🧑‍🏭

- You can use the below mentioned REST API endpoint to request the information for your application.
- Together with this readme file we provide you with a boilerplate NextJS application. Consider this as a starting point, but don't hesitate to make improvements or changes.

Carefully read the instructions before you proceed.

## Scope

The idea of the assignment is to improve and extend the development of an app that displays different types of `pets on a filter page`.

- Replace hardcoded pets with pet data fetched from the following REST API:
  - GET https://660579c92ca9478ea1806a31.mockapi.io/api/v1/pets.
  - You can find the full documentation of the API here: https://github.com/mockapi-io/docs/wiki/Code-examples.
- Implement a filter to filter pets by `species`.
- Implement a filter to allow sorting pets by `name`.
- Implement sorting pets by `dateAdded` when the "latest added" filter is enabled.
- Make sure that the page matches the provided [designs](#design-specifics).
- Make general improvements.

Useful quick-links:

- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)

## Requirements

- The application:
  - Must be responsive
  - Must be accessible
  - Should use semantic HTML
  - Must be type-safe
  - Should contain tests
  - Must work on modern browsers

## Design specifics

Refer to the designs and specifications in the `/designs` directory for detailed information on component specifications, layout designs, color codes and font usage.

### Designs

- [Component Specifications](./designs/component-specifications.png)
- [Filter Page - Desktop](./designs/filter-page-desktop.png)
- [Filter Page - Mobile](./designs/filter-page-mobile.png)

### Static assets

All the required `icons and images` are added to the `./public` directory

The images of all the pets are available in the `/public/images` folder.

The icons are available in the `/public/icons` folder.

### Colors used

- Yellow: `#E0B833`
- Blue: `#2B6DB1`
- Dark blue: `#285DAB`
- Gray: `#DDDDDD`
- White: `#FFFFFF`
- Black: `#111111`

> These colors are already defined in the `globals.css` file.

### Font used

- `Open Sans`

## Conditions

Take as much time as you feel comfortable with. Based on the amount of time you spent in combination with what you handed in we'll go over your assignment and ask questions along the way. Your reasoning is the most important to us!

Make sure you hand in your assignment 48 hours before the second interview! That way you give us some time to go over it too 🤓

### Submission instructions

Please create a zip file of the project folder (excluding the node_modules directory) and upload it to a cloud service (such as WeTransfer or Google Drive). Share the link via email with the recruiter at least 48 hours before the second interview.

## Usage

### Global dependencies

Make sure you have Node 20 installed:

- [Node.js](https://nodejs.org/)
- [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)

### Install dependencies

```
npm install
```

### Run development server

```
npm run dev
```

Will open your default browser to [http://localhost:3000](http://localhost:3000).

### Build production bundles

```
npm run build
```

## Questions

- **Question**: Can I use NPM packages or frameworks like Material-ui?

- **Answer**: Yes, you can, but we don't recommend this since it decreases the chance of showing your skills.

If you have any other questions while working on the exercise feel free to reach out. We will be happy to help.

Happy coding! 😺

## All commands

| Command                 | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| **dev**                 | Start the Next.js development environment              |
| **build**               | Create a Next.js production build                      |
| **start**               | Start a webserver for the production build             |
| **lint**                | Lint the code using ESLint and Stylelint               |
| **lint:fix**            | Fix linting errors for all files                       |
| **format**              | Formats the code using Prettier                        |
| **test**                | Run unit tests                                         |
| **test:fix**            | Run unit tests with updating snapshots                 |
| **test:coverage**       | Run unit tests with code coverage enabled              |
| **test:watch**          | Run unit tests in watch mode                           |
| **test:watch:coverage** | Run unit tests in watch mode and code coverage enabled |
| **typecheck**           | Validate TypeScript compilation                        |
