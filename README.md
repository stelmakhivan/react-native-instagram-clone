# react-native-instagram-clone

Instagram Clone — Express + React Native

## Run project locally

1. Add file `.env` into server folder with config

```
PORT=YOUR_PORT
GOOGLE_ACCOUNT="YOUR_GOOGLE_ACCOUNT"
SENDGRID_API_KEY="YOUR_SENDGRID_API_KEY"
JWT_SECRET="YOUR_JWT_SECRET"
```

2. Install all dependencies with `npm install` or `yarn`

3. Configure your `prisma` account; in root directory put `prisma.yml`

```
endpoint: YOUR_ENDPOINT
datamodel: datamodel.prisma

generate:
  - generator: javascript-client
    output: ./generated/prisma-client/
```

4. Install globally `nodemon` and `prisma` packages

5. Run `yarn prisma`

6. Install `node_modules` in `client` folder

7. Run `yarn serve:web`

## Graphql resolvers

- [x] Create an account
- [x] Request Secret
- [x] Confirm Secret (Log In)
- [x] Like / Unlike the photo
- [x] Comment on a photo
- [x] Search by user
- [x] Search by location
- [x] Follow / Unfollow User
- [x] Edit my profile
- [x] See user profile
- [x] See my profile
- [x] See the full photo
- [x] Upload a photo
- [x] Edit the photo (Delete)
- [x] See the feed
- [x] Send private Mesage
- [x] See rooms
- [x] See room
- [x] Receive Meesage (Realtime)
