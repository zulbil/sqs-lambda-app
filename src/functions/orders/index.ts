import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const orderProcessor =  {
  handler: `${handlerPath(__dirname)}/handler.process`,
  events: [
    {
      http: {
        method: 'post',
        path: 'orders',
        request: {
          schemas: {
            'application/json': schema,
          }
        }
      }
    }
  ],
  role: 'OrderProcessorRole'
};

export const orderNotifier = {
  handler: `${handlerPath(__dirname)}/handler.notify`,
  events: [
    {
      sqs: {
        arn: {
          'Fn::GetAtt': ['OrderSQSQueue', 'Arn']
        }
      }
    }
  ],
  // onError: {
  //   destinantion: {
  //     'Fn::GetAtt': ['DeadLetterQueue', 'Arn']
  //   }
  // },
  role: 'OrderProcessorRole'
};
