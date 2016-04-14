# Microservice template for nodejs 
* Base template for microservice using node js with below packages

## Packages list

* NodeJS

* Packages*

* HTTP
>- express
    
* Logging
>- winston
>- morgan    
    
* Lint
>- eslint
    
* Code
>- typescript (typed superset of javascript)

* database
>- mongodb
>- mangoose (ODM)

* testing
>- mocha (framework)
>- chai (asserting library)
>- sinon (mock)
    
* Build
>- webpack
>- gulp (if needed)


### Follow the below steps to run
```
npm run build 
export NODE_ENV=dev
export NODE_CONFIG_DIR=./config/environment
node ./dist/server.js
```
