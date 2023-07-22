import mongoose from "mongoose";
import * as _ from "lodash";
import { ConnectOptions } from "mongoose";
import { DB_CONFIG } from "./secrets";

let __connectionEstablished = false;

import * as qs from "querystring";

interface DatabaseConfig {
  user?: string;
  host: string;
  port?: string;
  schema: string;
  password?: string;
  options?: Record<string, string>;
}

const MongoUtils = {
  /**
   * Creates connection uri for mongo
   * @param dbConfiguration
   * @return {string}
   */
  buildMongoUri(dbConfiguration: DatabaseConfig) {
    const { user, host, schema, password } = dbConfiguration;
    const port = dbConfiguration.port || 27017;

    let mongoUri = `mongodb://`;
    if (user && password)
      mongoUri += `${encodeURIComponent(user)}:${encodeURIComponent(
        password
      )}@`;
    mongoUri += `${host}:${port}/${schema}`;

    const connectionOptions = dbConfiguration.options;
    if (!_.isEmpty(connectionOptions))
      mongoUri += `?${qs.stringify(connectionOptions)}`;

    return mongoUri;
  },

  /**
   * Create sparse partial index options for the given field
   * @param {string} prop
   * @return {{partialFilterExpression: {}}}
   */
  sparseIndexOptions(prop: string) {
    return { partialFilterExpression: { [prop]: { $exists: true } } };
  },

  /**
   *  Generate a new mongo id
   */
  generateMongoId() {
    return new mongoose.Types.ObjectId();
  },
};

export const MongoConnector = {
  /**
   * Establish connection to the mongo database
   * @return {Promise<void>}
   */
  async connectToMongo() {
    if (__connectionEstablished) return;
    __connectionEstablished = true;

    // Connect with the database here
    const dbConfigurations: DatabaseConfig = {
      host: DB_CONFIG.host,
      schema: DB_CONFIG.schema,
    };

    const mongoUri = MongoUtils.buildMongoUri(dbConfigurations);

    const timeout = 30 * 1000;
    // recommended options from https://gist.github.com/mongolab-org/9959376
    const connectOptions: ConnectOptions = {
      // default pool size is 5
      minPoolSize: 5,
      maxPoolSize: 50,
      connectTimeoutMS: timeout,
    };

    await mongoose.connect(mongoUri, connectOptions);
  },

  /**
   * Close existing mongoose connections.
   * The default mongoose connection is @mongoose.connection
   * When using multiple mongoose connections, we will need to close each connection separately.
   *
   * @return {Promise<void>}
   */
  async closeConnections() {
    await mongoose.connection.close();
  },
};
