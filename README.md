# Flourish

## Team

  - __Product Owner__: Olivia Salbo
  - __Scrum Master__: Michael Bazile
  - __Development Team Members__: Harley Padua, Nico Paulino, James Easter, Michael Bazile, Chris Nguyen

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- Node v12 or higher
- MariaDB v2.3.1 or higher

### Installing Dependencies

From within the root directory run:

- npm install

- Make sure you have MariaDB installed and have a password set for your root user.

## Usage

> Some usage instructions

- There are three different start scripts to start this application:
  1. npm run start - this script starts the expo cli server
  2. npm run server - this script starts the feathers and mariadb servers
  3. npm run dev - this script starts both the frontend and backend at the same time

- You can initialize the schema by running either of the following two commands:
  1. mariadb -u root < schema.sql
  2. mariadb -u root -p < schema.sql

- You can shell into mariadb into with either of the following two commands:
  1. mariadb -u root
  2. mariadb -u root - p

- For Mac OSX
 1. After running npm run dev, start Xcode's iOS simulator to view application.

 *IMPORTANT*
- For mobile viewing, in a separate terminal, run the following command to access localhost from mobile your device for development.
  1. ngrok http 8080
  2. Copy and past the forwarding http url and paste it on line 43 in client/store/middleware/api.js
  3. *NOTE* Every time you run ngrok http 8080, you will have to repeat the second instruction.

- Create a .env file and include the following:
  - DB_USERNAME
  - DB_HOST
  - DB_DATABASE
  - DB_PASSWORD
  - IOS_CLIENT_ID
  - PLANT_ID_KEY
  - CLOUDINARY_URL


### Roadmap

View the project roadmap [here](https://github.com/Team-GreenDev/flourish/issues);


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
