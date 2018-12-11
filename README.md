# DrinkUp-Backend-Testing
#### Shayne Preston, Dylan Cheung, Jeffrey Poegel, Jason Hall

## Installation

1. Clone Repo from github to local machine
2. run 'npm install' to download jest and respected packages
3. To run test suites execute 'npm run test' from the commandline within the directory of your project

## Overview

Jest testing for SD&D Drink Up Backend endpoints. Each test suite generates a random fresh entity and then applies tests to it, that entity is then removed after for cleanliness

## Existing Tests

#### Users:

+ Add unique person
+ Check to make sure duplicate emails cannot be added
+ search by email
+ Search by invalid email
+ Get a user by its ID
+ look for an invalid ID
+ signin with a valid email/password
+ signin with an invalid email/password
+ update a user with a valid ID
+ try to update a user with an invalid ID

#### Events:

+ Generate an event
+ Get an event by its valid ID
+ get an event by its invalid ID
+ get all completed events by an owner
+ close an event by its ID
+ try to close an event with an invalid ID

#### Attendees:

+ Create a new attendee
+ Get an attendee by ID
+ Get an attendee by invalid ID
+ Get all attendees by an event ID
+ have an attendee leave an event
+ have an attendee return to an event
