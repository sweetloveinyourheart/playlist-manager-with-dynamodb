import dynamoose from 'dynamoose';

/**
 * Initializes a connection to Amazon DynamoDB using Dynamoose, configuring it to use a local DynamoDB instance.
 *
 * @function
 * @name initDynamodbConnection
 * @param {boolean} [logger=false] - A flag indicating whether to enable logging (default is false).
 * @throws {Error} Throws an error if there is an issue during DynamoDB connection initialization.
 * @returns {Promise<void>}
 *
 * @example
 * // Import the function
 * import { initDynamodbConnection } from './path/to/your/module';
 *
 * // Initialize DynamoDB connection
 * initDynamodbConnection();
 */
export const initDynamodbConnection = async (logger: boolean = false): Promise<void> => {
    try {
        // Configure Dynamoose to use the local DynamoDB instance
        const ddb = new dynamoose.aws.ddb.DynamoDB({
            region: 'us-east-1',
            credentials: {
                accessKeyId: 'local',
                secretAccessKey: 'local'
            },
            endpoint: 'http://localhost:8000'
        });

        // Set the DynamoDB instance for Dynamoose
        dynamoose.aws.ddb.set(ddb);

        // Set the DynamoDB logger if specified
        if (logger) {
            (await dynamoose.logger()).providers.set(console);
        }

        console.log('[*] DynamoDB connected!');
    } catch (error) {
        // Log an error message if initialization fails
        console.log('[!] initDynamodbConnection failed, error:', error);
    }
};
