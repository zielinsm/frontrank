### FrontRank

Basic front-end framework popularity rank. Live demo is available [here](frontrank.zielinsk.im)...

![Desktop screenshot](https://github.com/zielinsm/frontrank/blob/master/screenshot-desktop.png?raw=true)

## General
  * React for the front-end
  * Netlify Functions as the back-end that fetches data from remote APIs, caches them in a remote MongoDB and returns to the client
  
## Features

The app compares GitHub and NPM statistics of each framework and returns a rank based on these elements. Due to CORS restrictions of APIs used, results have to be fetched on the back-end and sent back to the client. As the back-end is running on serverless Netlify Functions, a remote MongoDB is used to cache the results. The cache is updated everyday.

## Usage

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/zielinsm/frontrank)

The app was boilerplated using [create-react-app-lambda](https://github.com/netlify/create-react-app-lambda).

Commands to use with the project:
  * Development server for React: `yarn start`
  * Development server for Lambda: `yarn start:lambda`
  * Build the front-end: `yarn build`
  * Build the lambda functions: `yarn build:lambda`



