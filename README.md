# Internet of Things, Group H project

## Setup

**Requirements**

- Python3 and PIP
- Node 16/LTS and NPM

### Repository setup

We use pre-commit hooks to maintain quality commits. Setup the repository to use them following these steps:

```shell
# Install pre-commit
pip install pre-commit

# Clone the repository to your local machine
git clone git@github.com:jkerola/iot-project.git
cd iot-project

# Initialize pre-commit hooks in the repository
pre-commit install
```

See the readme files under _backend_ and _frontend_ for more instructions.

## Example query

The address for the data-management API documentation is
https://smartcampus-prod-v1.rahtiapp.fi/api

You can query this with a GET request, providing parameters appended with ?param=value

example:

```
get /events?metrics=humidity,co2
headers: {
    Authorization: Api-key <key here>
}
```

| params  |                                 value                                  |
| :------ | :--------------------------------------------------------------------: |
| metrics | humidity, temperature, co2, light, motion, battery, deveui, luminosity |
| from    |                           ISO formatted date                           |
| to      |                           ISO formatted date                           |

Check the wiki at https://smartcampus.oulu.fi/manage

## Contributing

We operate by merge/pull requests. First make sure you are running the latest changes by running `git switch main && git pull`.

Create a new branch from main for your work with `git checkout -b feat-work-description-here`.

Commit your changes periodically with `git commit -m "describe what you did here"`.

Finally, push your changes to the repository with `git push -u origin <branch name here>`, then create a pull request on the github repository website.
