# Quiz Manager

This Quiz Manager tool allows teachers to create quizzes that consist of multiple
questions of different types (currently there is only one type supported: MultipleChoice).
Students are then allowed to login to the platform and submit their responses to
these quizzes. Their responses are automatically graded upon submission, and each
question type supports their own autograding handlers.

> **Note:** This is a much more simplified version of the types of content you will
> be working with at Stukent.

## Overview

This project was created as a miniature version of the Feature Platform, which is the
platform some Stukent properties run on. It uses the following technologies:

- TypeScript
- GraphQL (Apollo)
- React
- Knex
- ObjectionJS (ORM)

## Credentials

Here are the credentials for the user accounts:

- Teacher: teacher / testing-teacher
- Student: student / testing-student

These credentials are also visible directly on the login page in case you forget them.

## Starting

To start the quiz manager:

1. Make sure you have Node version 20+ and Docker installed. If you are on WSL
  or Linux, [there are potentially more steps for you to run.](#wsl)
1. Run `npm install` in both the `web` and `server` folders.
1. Run `docker-compose up` in the root of the repository.

Four containers will be created and started:

- PostgreSQL for the database
- PGAdmin for accessing the contents of the database
- server
- web

Both the `server` and `web` containers will automatically restart once they
detect code changes. Sometimes, though, you may need to cancel out of the
`docker-compose up` command and run it again to get the containers to restart
completely.

To access the service, go to http://localhost:3001. The GraphQL playground (and the
backend) are available at http://localhost:3000.

To access PGAdmin, go to http://localhost:3002 and use these credentials:

- Username: test@test.com
- Password: postgres

You may be prompted for the database password whenever opening it. The database
password is `postgres`.

### WSL

The server + web themselves use Docker for execution, so should not have any
environment-specific requirements other than a Docker installation.

The unit tests have been tested on a ARM Windows installation inside a Parallels VM
with WSL2 running Ubuntu. In order to get the embedded PostgreSQL instance to run
inside the container, you'll need to run some commands to install the proper locales:

```shell
sudo locale-gen en_US.UTF-8
sudo dpkg-reconfigure locales # Select only "en_US.UTF-8" and then set it as the default
```

Outside of those commands, make sure you are not running the repository in your `/mnt/c`
folder. The local PostgreSQL database won't be able to set permissions properly inside
that folder, and won't be able to start successfully to run your tests.

After running those locale commands and copying the files to the Ubuntu user's home
directory, I was able to run the unit tests successfully.
