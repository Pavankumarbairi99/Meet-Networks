# Tinder Clone

## Technologies:
 - FrontEnd Reactjs,Tailwindcss, Html, CSS
 - BackEnd Nodejs, mongoDb, Express.js 

# API

## AuthRouters
- POST /signup
- POST /login
- POST /logout

##  Profile Routers
- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password (forgot pasword)

##  ConnectionRequest router
- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

## UserRouter
- GET/user/conneciton
- GET/user/requests
- GET/user/feed - gets yout he profiles of other user on platform
