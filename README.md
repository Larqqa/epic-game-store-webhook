# Webhook for free games on Epic Game store

This is a simple webhook for sending the free games over a webhook to a discord server.\
The source is written in TypeScript and uses OOP for formatting the JSON and embed.

## Installation

Clone the repository and move into the cloned directory\
Run the command `npm install` to install the dependencies\
Run the command `npm run build` to make a production build\
Make a `.env` file in the project folder with the following variable:
```
WEBHOOK=replace_this_your_webhook_url
```

## Scripts

### `npm start`
this starts the development environment.\
This project uses Nodemon for watching and building during development.

### `npm run build`
This removes the old build folder and makes a fresh production build.

### `npm run send`
This runs the webhook script from `./build` and sends the embeds.

### `npm run lint`
This lints the source files with EsLint

### `npm run lint:fix`
This lints the source files and fixes the errors.
