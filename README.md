# aws-course-nodejs
___

This is backend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Serverless](https://serverless.com/) as a serverless framework
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool
- [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild) as a TypeScript bundler
- [jest](https://jestjs.io/) as testing framework
- [serverless-auto-swagger](https://github.com/completecoding/serverless-auto-swagger) as a swagger endpoints generator
___

# Back-end (products-service)

| Lambda          | Description                   | Method | URL                                                                                                      |
| --------------- | ----------------------------- | ------ |----------------------------------------------------------------------------------------------------------|
| getProductsList | get ALL products              | GET    | https://7cpjwag9z8.execute-api.us-east-1.amazonaws.com/dev/products                                      |
| getProductsById | get ONE product in JSON by id | GET    | https://7cpjwag9z8.execute-api.us-east-1.amazonaws.com/dev/products/{id} |
| createProduct | create new product (request body example: {body: {description: string, title: string, price: number, count: number}}) | POST    | https://7cpjwag9z8.execute-api.us-east-1.amazonaws.com/dev/products |

# Back-end (import-service)
endpoint: GET - https://mcicg31rk3.execute-api.us-east-1.amazonaws.com/dev/import

# Back-end (cart-service)

| Lambda          | Description                   | Method | URL                                                                                                      |
| --------------- | ----------------------------- | ------ |----------------------------------------------------------------------------------------------------------|
| getUsers        | get ALL users                 | GET    | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/users                                         |
| getUser         | get user by userId            | GET    | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/user/{id}                                     |
| createUser      | create new user (body: {"name": string,"email": string,"password": string}) | POST   | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/user                                          |
| getOrders       | get ALL orders                | GET    | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/orders                                        |
| getOrder        | get order by orderId          | GET    | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/order/{id}                                    |
| updateOrder     | update order by orderId (body: { delivery?: {type: string, address: any }, comments?: string, status?: "paid" || "delivered" }) | PATCH  | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/order/{id}                                    |
| createOrder     | create new order (body: {"userId": string, "cartId": string, "payment": {"type": string}, "delivery": {"type": string, "address": string},   "comments": string, "status": string, "total": integer}) | POST   | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/order                                  |
| getCarts        | get ALL carts                 | GET    | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/carts                                         |
| getCart         | get cart or create (if doesn't exist) by userId | GET    | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/cart/{userId}                                         |
| clearUserCart   | clear cart by userId         | DELETE | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/cart/{userId}                                         |
| updateUserCart  | update user cart (body: {"id": string cartId, "items": [{"product": {"id": string, "description": string,           "price": integer, "title": string},"count": integer}]}) | PUT    | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/cart/{userId}                                         |
| checkout        | checkout the cart and create new order (body: {"comments": string, "paymentType": string, "paymentAddress": string,  "paymentCreditCard": string, "deliveryType": string, "deliveryAddress": string}) | POST   | https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/cart/checkout/{userId}                                         |

# Front-end

- Frontend integrated with product service HTTP API & images from S3 Bucket: [Link to cloudfront website](https://d2xxscw559wzra.cloudfront.net)

# Swagger

https://6hecz00qhk.execute-api.us-east-1.amazonaws.com/swagger

# Available Scripts

To deploy to AWS use

```
npm run deploy
```

To run tests use

```
npm run test
```
To generate Swagger documentation use

```
npm run swagger:generate
```


# Task 8
endpoints:
  ANY - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/
  ANY - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
  POST - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/user
  GET - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/user/{id}
  GET - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/users
  GET - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/order/{id}
  GET - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/orders
  POST - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/order
  PATCH - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/order/{id}
  GET - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/carts
  GET - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/cart/{userId}
  DELETE - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/cart/{userId}
  PUT - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/cart/{userId}
  POST - https://zhedms7x0b.execute-api.us-east-1.amazonaws.com/dev/cart/checkout/{userId}
functions:
  main: cart-service-dev-main (21 MB)
  createUser: cart-service-dev-createUser (21 MB)
  getUser: cart-service-dev-getUser (21 MB)
  getUsers: cart-service-dev-getUsers (21 MB)
  getOrder: cart-service-dev-getOrder (21 MB)
  getOrders: cart-service-dev-getOrders (21 MB)
  createOrder: cart-service-dev-createOrder (21 MB)
  updateOrder: cart-service-dev-updateOrder (21 MB)
  getCarts: cart-service-dev-getCarts (21 MB)
  findUserCart: cart-service-dev-findUserCart (21 MB)
  clearUserCart: cart-service-dev-clearUserCart (21 MB)
  updateUserCart: cart-service-dev-updateUserCart (21 MB)
  checkout: cart-service-dev-checkout (21 MB)