# Backend for IOT project

Once running, the API is available at http://localhost:3000/

The default route **/** gives average CO2 and crowd estimations for all restaurants.

Furthermore, specific information can be requested by using the provided restaurant names, for example **/foodoo**.

Predictions are made using hard-coded limits set in **src/utils/analytics.ts**, which still require fine-tuning.

# Pre-reqs

-   Install [Node.js](https://nodejs.org/en/)
-   Install [VS Code](https://code.visualstudio.com/)

# Getting started

Project started from this [template repository](https://github.com/greenroach/express-ts-template.git)

-   Add .env file

```shell
# create a file called .env in the /backend directory
touch .env
# add the Api-key into the file
API_KEY=<key here>
```

-   Install dependencies

```
npm install
```

-   Start the development server

```
npm run dev
```

-   Build and run the project

```

npm run build
npm start

```

Navigate to `http://localhost:3000`

### Using the debugger in VS Code

Debugging is one of the places where VS Code really shines over other editors.
Node.js debugging in VS Code is easy to setup and even easier to use.
This project comes pre-configured with everything you need to get started.

When you hit `F5` in VS Code, it looks for a top level `.vscode` folder with a `launch.json` file.
In this file, you can tell VS Code exactly what you want to do:

```json
{
    "type": "node",
    "request": "attach",
    "name": "Attach by Process ID",
    "processId": "${command:PickProcess}",
    "protocol": "inspector"
}
```

This is mostly identical to the "Node.js: Attach by Process ID" template with one minor change.
We added `"protocol": "inspector"` which tells VS Code that we're using the latest version of Node which uses a new debug protocol.

With this file in place, you can hit `F5` to attach a debugger.
You will probably have multiple node processes running, so you need to find the one that shows `node dist/server.js`.
Now just set your breakpoints and go!

---

Based on [TypeScript Node Starter](https://github.com/Microsoft/TypeScript-Node-Starter) and [Express Generator](https://github.com/expressjs/generator)
