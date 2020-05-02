# react-native-instagram-clone

Instagram Clone — Express + React Native

## Run project locally

1. Add file `.env` into server folder with config

```
PORT=YOUR_PORT
GOOGLE_ACCOUNT="YOUR_GOOGLE_ACCOUNT"
SENDGRID_API_KEY="YOUR_SENDGRID_API_KEY"
JWT_SECRET="YOUR_JWT_SECRET"
PRISMA_ENDPOINT=YOUR_PRISMA_ENDPOINT
```

2. Install all dependencies with `npm install` or `yarn` in root, client and instaclone-app folders

3. Configure your `prisma` account; in root directory put `prisma.yml`

```
endpoint: YOUR_ENDPOINT
datamodel: datamodel.prisma

generate:
  - generator: javascript-client
    output: ./generated/prisma-client/
```

4. Install globally `nodemon`, `prisma` and `expo-cli` packages

5. Run `yarn prisma`

6. Install `node_modules` in `client` folder

7. Run `yarn serve:web` for web or `yarn serve:app` for mobile (you can also run `yarn serve` if you want to view all platforms)

8. If you want to upload images - you need to sign in `Amason Web Services` (I used free trial aws account and S3 bucket) and put your settings to `.env` like

```
....
AWS_KEY="YOUT_AWS_KEY"
AWS_SECRET="YOUR_AWS_SECRET"
AWS_BUCKET_NAME="YOUR_AWS_BUCKET_NAME"
```

![Preview](/preview/preview1.png?raw=true)
![Preview](/preview/preview2.png?raw=true)

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
