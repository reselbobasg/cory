import { DataUtilities } from './../utilities/data_utils';
import { IReviewer, IVendor, IRating } from './../src/models/models'
import { httpServer, stopServer } from '../server';
import { GraphQLClient } from 'graphql-request';
import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import mongoose from 'mongoose';
import Faker from 'faker'

const serverConfig = { serverUrl: 'http://localhost:3000/graphql', subscriptionUrl: 'ws://localhost:3000/graphql' };
let graphQLClient: GraphQLClient;
before(async () => {
  graphQLClient = await new GraphQLClient(serverConfig.serverUrl);
});
after(async () => {
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
  it('Can Add Rating', async () => {
    const query = `{
      capabilities{
        id
        capabilityType
        description
        createDate
      }
    }`;
    const data = await graphQLClient.request(query)
    const capability_id = data.capabilities[0].id;
    const reviewer = DataUtilities.getRandomReviewerSync();
    const vendor = DataUtilities.getRandomVendorSync();
    const ratingValue: number = Math.floor(Math.random() * 5) + 1;
    const comment = Faker.lorem.words(6);
    const mutation = `mutation{
      addRating(rating: {rating: ${ratingValue}, comment: "${comment}",
        reviewer: {firstName:"Justice",lastName:"Pacocha",email:"Justice.Pacocha@reviewer.com"}, 
        vendor: {name:"Aufderhar, Roob and Corwin",comment:"velit explicabo temporibus vitae accusantium",
          contact:{firstName:"Nona",lastName:"Russel",email:"Nona.Russel@AufderharRoob and Corwin.com"}}, 
        capability_id: "${capability_id}"}){
          id
          rating
          comment
        }
      }`;
    console.log(mutation);
    const result = await graphQLClient.request(mutation);
    console.log(result);
    const obj = result.addRating;
    //expect(obj.comment).to.equal(comment);
    //expect(obj.rating).to.equal(ratingValue);
    expect(obj.id).to.be.a('string');
    expect(obj.rating).to.be.a('number');
    expect(obj.comment).to.be.a('string');
    expect(obj.capability_id).to.equal(capability_id);
    expect(obj.comment).to.equal(comment);
    expect(obj.rating).to.equal(ratingValue);
  })
});