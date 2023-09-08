# SQS LAMBDA APP

Managing surges in order volume during special sales events can be challenging for e-commerce platforms. This sample project addresses this challenge by demonstrating how to seamlessly integrate Amazon SQS and AWS Lambda to create a robust, scalable, and fault-tolerant order processing system.
This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

On every push in the dev or master branch, a CI/CD setup will deploy automatically your stack. 
Make sure that you've setup correctly your secrets:  `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_PROFILE`

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/orders` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/orders/schema.ts` JSON-Schema definition: it must contain the `name`, `price` and `phone_number` properties.


### Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f orderProcessor --path src/functions/orders/mock.json` if you're using NPM
- `yarn sls invoke local -f orderProcessor --path src/functions/orders/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.


## Template features

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file
- [@aws-sdk/client-sqs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sqs/) - AWS SDK for JavaScript SQS Client for Node.js, Browser and React Native

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
