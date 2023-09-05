import { SQSClient, SendMessageBatchCommand, SendMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";

const region        = process.env.REGION
const queueUrl      = process.env.QUEUE_URL
const delaySeconds  = process.env.DELAY_S || 1;

const sqsClient     = new SQSClient({ region });

export const sendMessage = async (message: string) => {
    try {
        
    } catch (error) {
        
    }
}

export const sendBatchToQueue = async (chunk: any[], index: number) => {
  const Entries = chunk.map((record, i) => ({
      Id: `${Date.now()}-${index}-${i}`,
      MessageBody: JSON.stringify(record),
      DelaySeconds: delaySeconds
  }));

  const sqsParams = {
      QueueUrl: queueUrl,
      Entries
  };

  console.log('Preparing message batch:', JSON.stringify(sqsParams));

  try {
      await sqsClient.send(new SendMessageBatchCommand(sqsParams));
      console.log('Batch sent successfully');
  } catch (err) {
      console.error('Error sending batch:', JSON.stringify(err.message));
      // Handle the error appropriately here. 
      // You may want to return, throw the error, or handle it in another way.
  }
}

export const deleteMessage = async (ReceiptHandle: string) => {
  try {
      const deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle
      };
      await sqsClient.send(new DeleteMessageCommand(deleteParams));
      console.log(`Message ${ReceiptHandle} deleted from queue`);
  } catch (error) {
      console.log('Error when deleting the message:', error);
      throw error;
  }
}
