import { 
    SQSClient, SendMessageBatchCommand, 
    SendMessageCommand, 
    DeleteMessageCommand, 
    SendMessageBatchCommandInput, 
    SendMessageBatchRequestEntry 
} from "@aws-sdk/client-sqs";

const region        = process.env.REGION
const QueueUrl      = process.env.QUEUE_URL
const delaySeconds  = process.env.DELAY_S || 1;

const sqsClient     = new SQSClient({ region });

export const sendMessage = async (MessageBody: string) => {
    try {
        const command: SendMessageCommand = new SendMessageCommand({
            QueueUrl,
            DelaySeconds: +delaySeconds,
            MessageBody
        })

        const response = await sqsClient.send(command)
        console.log(response);
        return response;
    } catch (error) {
        console.log('Error happened ...', error.message)
    }
}

export const sendBatchToQueue = async (chunk: any[], index: number) => {
  const Entries : SendMessageBatchRequestEntry[] = chunk.map((record, i) => ({
      Id: `${Date.now()}-${index}-${i}`,
      MessageBody: JSON.stringify(record),
      DelaySeconds: +delaySeconds
  }));

  const sqsParams : SendMessageBatchCommandInput = {
      QueueUrl,
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
          QueueUrl,
          ReceiptHandle
      };
      await sqsClient.send(new DeleteMessageCommand(deleteParams));
      console.log(`Message ${ReceiptHandle} deleted from queue`);
  } catch (error) {
      console.log('Error when deleting the message:', error);
      throw error;
  }
}
