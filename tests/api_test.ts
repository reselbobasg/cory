import { httpServer, stopServer } from '../server';
import { GraphQLClient } from 'graphql-request';
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import Faker from 'faker'

const serverConfig = { serverUrl: 'http://localhost:3000/graphql', subscriptionUrl: 'ws://localhost:3000/graphql' };
let graphQLClient: GraphQLClient;
before(async () => {

});
after(async () => {

});

describe('API Tests', async function () {

});