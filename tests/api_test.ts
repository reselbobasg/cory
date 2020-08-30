import { IReviewer, IVendor, IRating } from './../src/models/models'

import { httpServer, stopServer } from '../server';
import { GraphQLClient } from 'graphql-request';
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import mongoose from 'mongoose';
import Faker from 'faker'
import { DataUtilities } from '../utilities/data_utils'

const serverConfig = { serverUrl: 'http://localhost:3000/graphql', subscriptionUrl: 'ws://localhost:3000/graphql' };
let graphQLClient: GraphQLClient;
before(async () => {
  graphQLClient = await new GraphQLClient(serverConfig.serverUrl);
});
after( async () => {
  stopServer();
});

describe('API Tests', async function () {
  it('Can Get Capabilities', async () => {
    const query = `{
      capabilities{
        id
        capabilityType
        description
        createDate
      }
    }`;
    const data = await graphQLClient.request(query)
    console.log(data.capabilities.length);
    expect(data.capabilities.length).to.be.greaterThan(0);
  });
});