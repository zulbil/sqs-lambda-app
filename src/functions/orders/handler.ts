import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { createLogger } from '@libs/logger';
import { sendMessage } from './../../services/sqsHelper'

const logger = createLogger('orderLogging');

const processHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const request = event.body

    logger.info('Receiving body parameters', { body: request });

    const data = {
      id: Date.now(),
      orderStatus: 'Shipped',
      phoneNumber: request.phone_number
    };

    const Message = JSON.stringify(data); 

    logger.info('Sending order details to the Queue', { Message })

    await sendMessage(Message);

    return formatJSONResponse({
      'message': 'Order process successfully',
      ...data
    });

  } catch (error) {
    logger.error('Error occured', { error })
    return formatJSONResponse({
      message : error.message
    }, 500); 
  }
};


export const notify = async (event: any): Promise<void> => {
  try {

    for (const record of event.Records) {
      const orderDetails = JSON.parse(record.body);
    }
    const record = event.Records[0];
    logger.info('Reading event', { event })

    const message = JSON.parse(record.Sns.Message);

    const orderStatus = message.orderStatus
    const PhoneNumber = message.phoneNumber

    logger.info('SMS notification sent successfully');
    
  } catch (error) {
    logger.error('Error occured', { message : error.message }) 
  }
};


const process = middyfy(processHandler);

export { process }


