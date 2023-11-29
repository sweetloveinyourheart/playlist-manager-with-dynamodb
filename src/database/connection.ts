import dynamoose from 'dynamoose'

/**
 * Initializes a connection to Amazon DynamoDB using the Dynamoose library.
 * This function configures Dynamoose to use the local DynamoDB instance.
 * If an error occurs during the initialization, it logs the error message.
 *
 * @function
 * @name initDynamodbConnection
 * @throws {Error} If there is an error during the DynamoDB connection initialization.
 * @returns {void}
 *
 * @example
 * // Import the function
 * import { initDynamodbConnection } from './path/to/your/module';
 *
 * // Initialize DynamoDB connection
 * initDynamodbConnection();
 */
export const initDynamodbConnection = (): void => {
    try {
        // Configures Dynamoose to use the local DynamoDB instance
        dynamoose.aws.ddb.local();
        console.log("[*] Dynamodb connected !");
    } catch (error) {
        // Logs an error message if the initialization fails
        console.log("[!] InitDynamodbConnection failed, error:", error);
    }
};
