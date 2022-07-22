# seriespedia

A library for people to discover new TV shows or learn more about the shows they knew.

## How do I run it?

Assuming that you have set up your own MongoDB database and auth0 account:

1. After cloning this repo, change `dotenv` to `.env` and fill the blanks in that file with your own keys.
2. Run `$ npx prisma migrate` (optionally, you can run `$ npx prisma studio` afterwards to have a visual version of your DB.
3. Finally, run `$ yarn dev` to launch the server on localhost and **_voila!_**

---

## Made with

### Core

- Next.js
- TypeScript

### Database

- MongoDB
- Prisma

### UI Libraries

- Reactstrap
- Chakra UI

### Authentication

- auth0

...and love.
