# aws-course-nodejs
___

This is backend starter project for nodejs-aws mentoring program. It uses the following technologies:

- [Serverless](https://serverless.com/) as a serverless framework
- [TypeScript](https://www.typescriptlang.org/) as a type checking tool
- [serverless-esbuild](https://www.serverless.com/plugins/serverless-esbuild) as a TypeScript bundler
- [jest](https://jestjs.io/) as testing framework
- [serverless-auto-swagger](https://github.com/completecoding/serverless-auto-swagger) as a swagger endpoints generator
___

# Back-end 

| Lambda          | Description                   | Method | URL                                                                                                      |
| --------------- | ----------------------------- | ------ |----------------------------------------------------------------------------------------------------------|
| getProductsList | get ALL products              | GET    | https://2g5fbkdx6e.execute-api.us-east-1.amazonaws.com/dev/products                                      |
| getProductsById | get ONE product in JSON by id | GET    | https://2g5fbkdx6e.execute-api.us-east-1.amazonaws.com/dev/products/{id} |

# Front-end

- Frontend integrated with product service HTTP API & images from S3 Bucket: [Link to cloudfront website](https://d2xxscw559wzra.cloudfront.net)

# Swagger

https://dri41upkrc.execute-api.us-east-1.amazonaws.com/swagger

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