## WaterMe!

Application for people who loves to have alot of plants but also have problem with remember to water them.

## Before running app

You have to prepare two .env files, one inside frontend folder and one inside backend folder.
There are three things to do with .env file:

1. Copy .env.tpl file and delete .tpl
2. Fill REACT_APP_GOOGLE_AUTH_API_CLIENTID variable with your google api cliend id
3. For backend .env file Fill JWTPRIVATEKEY with your jwtprivate key

### Onlt you want to run app without Docker

Addition thing you must prepare is your local mysql database. I'm using XAMPP for this: https://www.apachefriends.org/pl/index.html

## Running with Docker

1. Install Docker if you don't have it already
2. In root folder just type 'docker-compose up'

## Running without Docker / Available Scripts

### In root directory run 'npm install', then you can run:

### `npm run startFrontend`

Runs the app frontend in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run startBackend`

Runs the app backend in the development mode.\

Application will reload after changes.\

### `npm run dev`

Runs app frontend + backend in watch mode.

### `npm run testFrontend`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run testFrontend-coverage`

Runs tests of all frontend components and counts coverage. This command can be used for CI/CD environment.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: if you want to run this command first go to frontend dir - 'cd frontend'**

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
