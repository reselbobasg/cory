import { httpServer, stopServer } from '../server';
import { GraphQLClient } from 'graphql-request';
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import Faker from 'faker'

//const serverConfig = { serverUrl: 'http://localhost:3000/graphql', subscriptionUrl: 'ws://localhost:3000/graphql' };
//let graphQLClient: GraphQLClient;
import {DataSeeder} from "../utilities/DataSeeder";
before(async () => {

});
after(async () => {

});

describe('Seeder Tests', async function () {
    it('Can Seed Data', async function () {
        await DataSeeder.seed().then(() => {console.log('Done')})
    });
});